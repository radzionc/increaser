variable "name" {
  default = "pomodoro-api"
}

variable "sentry_key" {}

variable "table_prefix" {
  default = "pomodoro_"
}

variable "secret" {}

variable "email_secret" {}

variable "app_url" {}

variable "email_domain" {}

variable "google_client_id" {}

variable "ses_aws_region" {
  default = "us-east-1"
}

variable "paddle_vendor_id" {}

variable "telegram_chat_id" {}

variable "public_bucket_name" {}

variable "public_bucket_region" {}

variable "secrets_name" {}

variable "secrets_arn" {}