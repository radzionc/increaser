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

variable "google_client_secret" {}

variable "facebook_client_id" {}

variable "facebook_client_secret" {}

variable "linkedin_client_id" {}

variable "linkedin_client_secret" {}

variable "ses_aws_region" {
  default = "us-east-1"
}

variable "paddle_api_key" {}

variable "paddle_vendor_id" {}

variable "telegram_bot_token" {}

variable "telegram_chat_id" {}

variable "public_bucket_name" {}

variable "public_bucket_region" {}