terraform {
  backend "s3" {
    bucket = "infrastructure-remote-state"
    key    = "pomodoro/accounts-cleaner.tfstate"
    region = "eu-central-1"
  }
}

resource "aws_s3_bucket" "lambda_code_storage" {
  bucket = "tf-${var.name}-storage"
}

resource "aws_lambda_function" "service" {
  function_name = "tf-${var.name}"

  s3_bucket   = aws_s3_bucket.lambda_code_storage.bucket
  s3_key      = "lambda.zip"
  memory_size = "1024"

  handler = "index.handler"
  runtime = "nodejs20.x"
  timeout = "50"
  role          = aws_iam_role.service_role.arn

  environment {
    variables = {
      SENTRY_KEY : var.sentry_key,
      APP_URL : var.app_url,
      EMAIL_DOMAIN : var.email_domain,
      SES_AWS_REGION : var.ses_aws_region,
      PUBLIC_BUCKET_NAME: var.public_bucket_name,
      PUBLIC_BUCKET_REGION: var.public_bucket_region
    }
  }
}

resource "aws_iam_role" "service_role" {
  name = "tf_${var.name}_lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "service_permissions" {
  name = "tf_${var.name}_service_permissions"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid = "AllowDynamoDBActionsUsersTable",
        Effect = "Allow",
        Action = "dynamodb:*",
        Resource = "${var.users_table_arn}"
      },
      {
        Sid = "AllowDynamoDBActionsFeaturesTable",
        Effect = "Allow",
        Action = "dynamodb:*",
        Resource = "${var.features_table_arn}"
      },
      {
        Sid = "AllowDynamoDBActionsScoreboardsTable",
        Effect = "Allow",
        Action = "dynamodb:*",
        Resource = "${var.scoreboards_table_arn}"
      },
      {
        Sid = "AllowSpecificS3ActionsOnPublicBucket",
        Effect = "Allow",
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject"
        ],
        Resource = [
          "arn:aws:s3:::${var.public_bucket_name}",
          "arn:aws:s3:::${var.public_bucket_name}/*"
        ]
      },
      {
        Sid = "AllowSendEmailSES",
        Effect = "Allow",
        Action = [
          "ses:SendEmail"
        ],
        Resource = "*"
      },
      {
        Sid = "AllowCloudWatchLogs",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect = "Allow",
        Resource = "*"
      }
    ]
  })
}


resource "aws_iam_role_policy_attachment" "service_role_attachment" {
  policy_arn = aws_iam_policy.service_permissions.arn
  role       = aws_iam_role.service_role.name
}

resource "aws_cloudwatch_event_rule" "cron" {
  name = "tf-${var.name}"
  schedule_expression = "rate(1 day)"
}

resource "aws_cloudwatch_event_target" "cron" {
  rule = "${aws_cloudwatch_event_rule.cron.name}"
  target_id = "tf-${var.name}"
  arn = "${aws_lambda_function.service.arn}"
}

resource "aws_lambda_permission" "cron_cloudwatch" {
  statement_id = "AllowExecutionFromCloudWatch"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.service.function_name}"
  principal = "events.amazonaws.com"
  source_arn = "${aws_cloudwatch_event_rule.cron.arn}"
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/tf-${var.name}"
  retention_in_days = 14
}

