#!/usr/bin/env bash
# Keeps the ev-grid-energy-cloudflare-ipv4 managed prefix list (which the
# ev-grid-energy-alb-sg ingress rules reference) equal to Cloudflare's
# published IPv4 ranges. Runs at deploy time and weekly from GitHub Actions.
#
# Safe by design: if Cloudflare's API response is missing, unsuccessful or
# implausible, it exits non-zero WITHOUT modifying the list. Adds and removes
# happen in one atomic modify call guarded by the list's current version.
#
#   DRY_RUN=1 infra/sync-cloudflare-ips.sh   # show the diff only
set -euo pipefail

PREFIX_LIST_NAME=ev-grid-energy-cloudflare-ipv4
PY=$(command -v python3 || command -v python)

json=$(curl -fsS --retry 3 --max-time 20 https://api.cloudflare.com/client/v4/ips)
want=$("$PY" -c '
import ipaddress, json, sys
d = json.load(sys.stdin)
if d.get("success") is not True:
    sys.exit("Cloudflare API returned success != true")
cidrs = sorted({str(ipaddress.IPv4Network(c)) for c in d["result"]["ipv4_cidrs"]})
if not 5 <= len(cidrs) <= 25:
    sys.exit(f"Implausible number of Cloudflare ranges: {len(cidrs)}")
print("\n".join(cidrs))
' <<<"$json")

read -r pl_id pl_version < <(aws ec2 describe-managed-prefix-lists \
  --filters "Name=prefix-list-name,Values=$PREFIX_LIST_NAME" \
  --query 'PrefixLists[0].[PrefixListId,Version]' --output text)
[[ "$pl_id" == pl-* ]] || { echo "Prefix list $PREFIX_LIST_NAME not found" >&2; exit 1; }

have=$(aws ec2 get-managed-prefix-list-entries --prefix-list-id "$pl_id" \
  --query 'Entries[].Cidr' --output text | tr '\t' '\n' | sed '/^$/d' | sort -u)

to_add=$(comm -13 <(echo "$have") <(echo "$want") | sed '/^$/d')
to_remove=$(comm -23 <(echo "$have") <(echo "$want") | sed '/^$/d')

echo "Prefix list $pl_id (version $pl_version): $(echo "$want" | wc -l | tr -d ' ') Cloudflare ranges"
[[ -z "$to_add$to_remove" ]] && { echo "Already in sync."; exit 0; }
[[ -n "$to_add" ]] && echo "Add:    $(echo $to_add)"
[[ -n "$to_remove" ]] && echo "Remove: $(echo $to_remove)"
[[ "${DRY_RUN:-}" == 1 ]] && { echo "DRY_RUN=1, no changes made."; exit 0; }

args=()
for c in $to_add; do args+=(--add-entries "Cidr=$c,Description=Cloudflare"); done
for c in $to_remove; do args+=(--remove-entries "Cidr=$c"); done
aws ec2 modify-managed-prefix-list --prefix-list-id "$pl_id" --current-version "$pl_version" "${args[@]}" \
  --query 'PrefixList.[PrefixListId,State]' --output text
