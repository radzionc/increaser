resource "aws_iam_role" "api" {
  name = "tf-${var.name}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Effect = "Allow",
        Sid = ""
      }
    ]
  })
}

resource "aws_iam_policy" "api" {
  name = "tf-${var.name}"
  path = "/"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid = "AllAPIActionsOnUsers",
        Effect = "Allow",
        Action = "dynamodb:*",
        Resource = "${aws_dynamodb_table.users.arn}"
      },
      {
        Sid = "QueryOnUsersEmailIndex",
        Effect = "Allow",
        Action = [
          "dynamodb:Query"
        ],
        Resource = "${aws_dynamodb_table.users.arn}/index/EmailIndex"
      },
      {
        Sid = "AllAPIActionsOnFeatures",
        Effect = "Allow",
        Action = "dynamodb:*",
        Resource = "${aws_dynamodb_table.features.arn}"
      },
      {
        Sid = "AllAPIActionsOnScoreboards",
        Effect = "Allow",
        Action = "dynamodb:*",
        Resource = "${aws_dynamodb_table.scoreboards.arn}"
      },
      {
        Sid = "AllAPIActionsOnEmails",
        Effect = "Allow",
        Action = "dynamodb:*",
        Resource = "${aws_dynamodb_table.emails.arn}"
      },
      {
        Sid = "LogsActions",
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Sid = "SESActions",
        Effect = "Allow",
        Action = [
          "ses:SendEmail"
        ],
        Resource = "*"
      },
      {
        Sid = "S3Actions",
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
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "api" {
  role       = aws_iam_role.api.name
  policy_arn = aws_iam_policy.api.arn
}
