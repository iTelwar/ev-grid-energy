# EV Grid Energy infrastructure

Production for https://evgridenergy.com, region `us-east-2`.

The AWS account is shared with another application, but nothing here uses its
resources. The only account-level item this stack relies on is the GitHub OIDC
provider (`token.actions.githubusercontent.com`), which AWS allows once per
account; access is controlled by the trust policy of `ev-grid-energy-github-deploy`.

```
Cloudflare (proxied, Full strict)
  -> ev-grid-energy-alb          (443/80 only from Cloudflare IPv4 ranges)
  -> ev-grid-energy-web-tg       (/api/health)
  -> ECS ev-grid-energy-prod / ev-grid-energy-web  (Fargate ARM64, 0.25 vCPU, 0.5 GB)
       -> DynamoDB ev-grid-energy-leads            (system of record)
       -> SNS ev-grid-energy-lead-notifications    (sales email)
```

| Stack | Template | Contents |
| --- | --- | --- |
| `ev-grid-energy-prod-certificate` | `certificate.yaml` | ACM certificate for `evgridenergy.com` + `www` (DNS validated in Cloudflare) |
| `ev-grid-energy-prod` | `ev-grid-energy.yaml` | VPC `10.30.0.0/16` (2 public subnets, no NAT, DynamoDB gateway endpoint), security groups, ALB, ECS, ECR, DynamoDB, SNS, IAM roles, log group, alarms, budget |

## Deploying

Application releases: push to `main`. `.github/workflows/deploy.yml` verifies,
builds the ARM64 image, smoke-tests it, pushes to ECR and rolls the service.
It needs the repository secret `AWS_DEPLOY_ROLE_ARN` (the stack output
`GitHubDeployRoleArn`).

Infrastructure changes:

```bash
AWS_PROFILE=<admin profile> infra/deploy.sh                    # keeps current image and parameters' defaults
AWS_PROFILE=<admin profile> infra/deploy.sh DesiredCount=1 CertificateArn=arn:aws:acm:...
```

Always pass the parameters currently in use (`DesiredCount`, `CertificateArn`);
CloudFormation otherwise falls back to the template defaults. `deploy.sh`
fills in `ImageTag` from the running service so an infrastructure update never
rolls the application back.

## Cloudflare origin allowlist

The ALB accepts traffic only from the managed prefix list
`ev-grid-energy-cloudflare-ipv4`. `sync-cloudflare-ips.sh` sets it from
https://api.cloudflare.com/client/v4/ips. It runs after every `deploy.sh`
and weekly (`.github/workflows/cloudflare-ips.yml`); if Cloudflare's response
is missing or implausible it fails without changing anything. A failed run
shows in the Actions tab.

ACM DNS validation and ALB health checks do not pass through this allowlist
(ACM queries DNS; health checks go from the ALB to the tasks), so the
restriction cannot block either.

## Leads

`ev-grid-energy-leads` is keyed by `leadId`, with the visitor-facing
`reference`, `type`, `status`, `stage`, `createdAt`, `updatedAt`,
`notificationStatus` (`pending` / `published` / `failed`) and the submitted
`lead`. Point-in-time recovery and deletion protection are on; there is no TTL.

To find leads whose notification failed:

```bash
aws dynamodb scan --table-name ev-grid-energy-leads \
  --filter-expression "notificationStatus = :f" --expression-attribute-values '{":f":{"S":"failed"}}'
```

## Alarms (to `ev-grid-energy-ops-alerts`)

- `ev-grid-energy-unhealthy-targets` - no healthy target for 3 minutes
- `ev-grid-energy-alb-5xx` - 5+ ALB or application 5xx in 5 minutes
- `ev-grid-energy-lead-pipeline-failures` - a lead failed to store, or its notification failed

## Budget

`ev-grid-energy-monthly` ($45) filters on the `Application` tag. It only
tracks spend after `Application` is activated as a cost allocation tag
(Billing console -> Cost allocation tags; the key appears up to 24 hours
after the first tagged usage).
