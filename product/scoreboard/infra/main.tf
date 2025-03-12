terraform {
  backend "s3" {}
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
  runtime = "nodejs22.x"
  timeout = "50"
  role          = aws_iam_role.service_role.arn

  environment {
    variables = {
      SENTRY_KEY : var.sentry_key,
    }
  }
}

resource "aws_iam_role" "service_role" {
  name = "lambda_execution_role"

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
  name = "service_permissions"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "s3:*",
        Effect = "Allow",
        Resource = "*"
      },
      {
        Action = "dynamodb:*",
        Effect = "Allow",
        Resource = "*"
      },
            {
        Action = "cloudfront:*",
        Effect = "Allow",
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "service_role_attachment" {
  policy_arn = aws_iam_policy.service_permissions.arn
  role       = aws_iam_role.service_role.name
}


resource "aws_cloudwatch_event_rule" "cron" {
  name = "tf-${var.name}"
  schedule_expression = "rate(10 minutes)"
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