debug = false

# General AWS Settings
name       = "jsoncampos"
aws_region = "us-west-2"

# Discovery
dns_namespace = "svc.jsoncampos.local"

# VPC Configuration
vpc_cidr              = "10.0.0.0/16"
vpc_subnet_01_az      = "us-west-2a"
vpc_subnet_02_az      = "us-west-2b"
vpc_subnet_pub01_cidr = "10.0.0.0/24"
vpc_subnet_pub02_cidr = "10.0.1.0/24"
vpc_subnet_pvt01_cidr = "10.0.2.0/24"
vpc_subnet_pvt02_cidr = "10.0.3.0/24"
