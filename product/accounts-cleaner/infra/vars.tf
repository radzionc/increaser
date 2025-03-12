variable "name" {
  default = "accounts-cleaner"
}

variable "sentry_key" {}

variable "app_url" {}

variable "ses_aws_region" {}

variable "email_domain" {}

variable "public_bucket_name" {}
variable "public_bucket_region" {}

variable "users_table_arn" {}

variable "features_table_arn" {}

variable "scoreboards_table_arn" {}
