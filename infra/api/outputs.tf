output "features_table_event_source_arn" {
  value = aws_dynamodb_table.features.stream_arn
}
