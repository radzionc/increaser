data "terraform_remote_state" "tasks_runner" {
  backend = "s3"

  config = {
    bucket = "infrastructure-remote-state"
    key    = "pomodoro/tasks-runner.tfstate"
    region = "eu-central-1"
  }
}

// to request and obtain temporary API credentials that allow taking action with the privileges that are granted to the role
resource "aws_iam_role" "api" {
  name = "tf-${var.name}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "api" {
  name = "tf-${var.name}"
  path = "/"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllAPIActionsOnUsers",
      "Effect": "Allow",
      "Action": "dynamodb:*",
      "Resource": "${aws_dynamodb_table.users.arn}"
    },
    {
      "Sid": "QueryOnUsersEmailIndex",
      "Effect": "Allow",
      "Action": [
        "dynamodb:Query"
      ],
      "Resource": "${aws_dynamodb_table.users.arn}/index/EmailIndex"
    },
    {
      "Sid": "AllAPIActionsOnAppSumoCodes",
      "Effect": "Allow",
      "Action": "dynamodb:*",
      "Resource": "${aws_dynamodb_table.appSumoCodes.arn}"
    },
    {
      "Sid": "AllAPIActionsOnFeatures",
      "Effect": "Allow",
      "Action": "dynamodb:*",
      "Resource": "${aws_dynamodb_table.features.arn}"
    },
    {
      "Sid": "AllAPIActionsOnScoreboards",
      "Effect": "Allow",
      "Action": "dynamodb:*",
      "Resource": "${aws_dynamodb_table.scoreboards.arn}"
    },
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "ses:SendEmail"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "api" {
  role       = aws_iam_role.api.name
  policy_arn = aws_iam_policy.api.arn
}
