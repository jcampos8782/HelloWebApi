resource "aws_service_discovery_private_dns_namespace" "main" {
  name        = var.dns_namespace
  description = "Private service discovery namespace"
  vpc         = var.vpc_id
}
