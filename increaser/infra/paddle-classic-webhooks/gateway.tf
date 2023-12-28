resource "aws_api_gateway_rest_api" "api" {
  name = "tf-${var.name}"
}

resource "aws_api_gateway_method" "api_root" {

  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_rest_api.api.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "api_root" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_rest_api.api.root_resource_id
  http_method = aws_api_gateway_method.api_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.api.invoke_arn}"
}

resource "aws_api_gateway_resource" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "api" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.api.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_method.api.resource_id
  http_method = aws_api_gateway_method.api.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.api.invoke_arn}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.api.arn}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.api.id}/*/*"
}

// copied from: https://github.com/carrot/terraform-api-gateway-cors-module/blob/master/main.tf
resource "aws_api_gateway_method" "resource_options" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.api.id}"
  http_method = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "resource_options_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.api.id}"
  http_method = "${aws_api_gateway_method.resource_options.http_method}"
  type = "MOCK"
  request_templates = { 
    "application/json" = <<PARAMS
{ "statusCode": 200 }
PARAMS
  }
}

resource "aws_api_gateway_integration_response" "resource_options_integration_response" {
  depends_on = ["aws_api_gateway_integration.resource_options_integration"]
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.api.id}"
  http_method = "${aws_api_gateway_method.resource_options.http_method}"
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS,GET,PUT,PATCH,DELETE'",
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }
}

resource "aws_api_gateway_method_response" "resource_options_200" {
  depends_on = ["aws_api_gateway_method.resource_options"]
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.api.id}"
  http_method = "OPTIONS"
  status_code = "200"
  response_models = { "application/json" = "Empty" }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_deployment" "api" {
  depends_on = ["aws_api_gateway_integration_response.resource_options_integration_response", "aws_api_gateway_integration.api"]
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${var.name}"
}


data "terraform_remote_state" "global_route" {
  backend = "s3"

  config = {
    bucket = "infrastructure-remote-state"
    key    = "increaser/global/route.tfstate"
    region = "eu-central-1"
  }
}


data "terraform_remote_state" "certificates" {
  backend = "s3"

  config = {
    bucket = "infrastructure-remote-state"
    key    = "increaser/global/certificates.tfstate"
    region = "eu-central-1"
  }
}

resource "aws_api_gateway_domain_name" "api" {
  certificate_arn = data.terraform_remote_state.certificates.outputs.certificate_arn_virginia_star
  domain_name     = "${var.name}.increaser.org"
}
resource "aws_route53_record" "api" {
  name    = "${aws_api_gateway_domain_name.api.domain_name}"
  type    = "A"
  zone_id = data.terraform_remote_state.global_route.outputs.prod_zone_id

  alias {
    evaluate_target_health = true
    name                   = "${aws_api_gateway_domain_name.api.cloudfront_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.api.cloudfront_zone_id}"
  }
}
resource "aws_api_gateway_base_path_mapping" "api" {
  api_id      = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${aws_api_gateway_deployment.api.stage_name}"
  domain_name = "${aws_api_gateway_domain_name.api.domain_name}"
}