#!/usr/bin/env bash
# Creates or updates the ev-grid-energy-prod CloudFormation stack.
#
#   AWS_PROFILE=quantum-volt-admin infra/deploy.sh [KEY=VALUE ...]
#
# Extra KEY=VALUE pairs are passed as parameter overrides, e.g.
#   infra/deploy.sh DesiredCount=1 CertificateArn=arn:aws:acm:...
#
# The service's image is rolled by GitHub Actions, so unless ImageTag is
# given this script re-uses the tag that is currently deployed; otherwise a
# stack update would roll the service back to an older image.
set -euo pipefail
cd "$(dirname "$0")"

export AWS_REGION=${AWS_REGION:-us-east-2}
STACK=ev-grid-energy-prod
TAGS=(Application="EV Grid Energy" Environment=Production Owner="EV Grid Energy" ManagedBy=CloudFormation Repository=iTelwar/ev-grid-energy)

overrides=("$@")
if ! printf '%s\n' "${overrides[@]}" | grep -q '^ImageTag='; then
  current=$(aws ecs describe-task-definition --task-definition ev-grid-energy-web \
    --query 'taskDefinition.containerDefinitions[0].image' --output text 2>/dev/null || true)
  [[ "$current" == *:* ]] && overrides+=("ImageTag=${current##*:}")
fi

echo "Deploying $STACK in $AWS_REGION with: ${overrides[*]:-(template defaults)}"
aws cloudformation deploy \
  --stack-name "$STACK" \
  --template-file ev-grid-energy.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset \
  --tags "${TAGS[@]}" \
  ${overrides[@]:+--parameter-overrides "${overrides[@]}"}

./sync-cloudflare-ips.sh
