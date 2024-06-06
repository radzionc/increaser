variable "name" {
  default = "accounts-cleaner"
}

variable "sentry_key" {}

variable "app_url" {}

variable "email_domain" {}

variable "public_bucket_name" {}
variable "public_bucket_region" {}

variable "ses_aws_region" {
  default = "us-east-1"
}