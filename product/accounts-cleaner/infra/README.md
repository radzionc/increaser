## accounts-cleaner

Your environment variables should have the following values:

```sh
export AWS_SECRET_ACCESS_KEY=
export AWS_ACCESS_KEY_ID=
export AWS_REGION=

export TF_VAR_sentry_key=
export TF_VAR_app_url=
export TF_VAR_email_domain=
export TF_VAR_public_bucket_name=
export TF_VAR_public_bucket_region=
export TF_VAR_users_table_arn=
export TF_VAR_features_table_arn=
export TF_VAR_scoreboards_table_arn=
export TF_VAR_ses_aws_region=

export TF_VAR_remote_state_bucket=
export TF_VAR_remote_state_key=
export TF_VAR_remote_state_region=
```

To setup infrastructure run

```sh
terraform init \
  -backend-config="bucket=${TF_VAR_remote_state_bucket}" \
  -backend-config="key=${TF_VAR_remote_state_key}" \
  -backend-config="region=${TF_VAR_remote_state_region}"

terraform apply
```
