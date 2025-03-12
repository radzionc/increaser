
// the container for all of the other API Gateway objects we will create
resource "aws_api_gateway_rest_api" "api" {
  name = "tf-${var.name}"
}

// All incoming requests to API Gateway must match with a configured resource and method in order to be handled
resource "aws_api_gateway_resource" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  // this resource will match any request path
  path_part = "{proxy+}"
}

resource "aws_api_gateway_method" "api" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.api.id
  http_method   = "ANY"
  authorization = "NONE"
}

// Each method on an API gateway resource has an integration which specifies where incoming requests are routed
resource "aws_api_gateway_integration" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_method.api.resource_id
  http_method = aws_api_gateway_method.api.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.api.invoke_arn
}

// the proxy resource cannot match an empty path at the root of the API
resource "aws_api_gateway_method" "api_root" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_rest_api.api.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "api_root" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_rest_api.api.root_resource_id
  http_method = aws_api_gateway_method.api_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.api.invoke_arn
}

# module "cors" {
#   source      = "github.com/carrot/terraform-api-gateway-cors-module"
#   resource_id = aws_api_gateway_resource.api.id
#   rest_api_id = aws_api_gateway_rest_api.api.id
# }

// to activate the configuration and expose the API at a URL
resource "aws_api_gateway_deployment" "api" {
  # depends_on  = [module.cors]
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = var.name
}

resource "aws_api_gateway_base_path_mapping" "api" {
  api_id      = aws_api_gateway_rest_api.api.id
  stage_name  = aws_api_gateway_deployment.api.stage_name
  domain_name = aws_api_gateway_domain_name.api.domain_name
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

data "terraform_remote_state" "global_route" {
  backend = "s3"

  config = {
    bucket = "infrastructure-remote-state"
    key    = "increaser/global/route.tfstate"
    region = "eu-central-1"
  }
}

resource "aws_route53_record" "api" {
  name    = aws_api_gateway_domain_name.api.domain_name
  type    = "A"
  zone_id = data.terraform_remote_state.global_route.outputs.prod_zone_id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.api.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.api.cloudfront_zone_id
  }
}


