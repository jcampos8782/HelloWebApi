provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source                = "./vpc"
  vpc_cidr              = var.vpc_cidr
  vpc_subnet_01_az      = var.vpc_subnet_01_az
  vpc_subnet_02_az      = var.vpc_subnet_02_az
  vpc_subnet_pub01_cidr = var.vpc_subnet_pub01_cidr
  vpc_subnet_pvt01_cidr = var.vpc_subnet_pvt01_cidr
  vpc_subnet_pub02_cidr = var.vpc_subnet_pub02_cidr
  vpc_subnet_pvt02_cidr = var.vpc_subnet_pvt02_cidr

  tags = {
    "domain"      = var.name,
    "ecs-cluster" = module.ecs.cluster_arn
  }
}

module "alb" {
  source             = "./alb"
  name               = var.name
  vpc_id             = module.vpc.vpc_id
  subnet_ids         = [module.vpc.subnet_pub01_id, module.vpc.subnet_pub02_id]
  security_group_ids = [module.vpc.sg_allow_http_id]

  tags = {
    domain = var.name
  }
}

module "discovery" {
  source        = "./discovery"
  vpc_id        = module.vpc.vpc_id
  dns_namespace = var.dns_namespace
}

module "ecs" {
  source                  = "./ecs"
  name                    = var.name
  service_discovery_ns_id = module.discovery.service_discovery_ns_id
  target_group_ui_arn     = module.alb.target_group_ui_arn
  target_group_aws_arn    = module.alb.target_group_aws_arn
  target_group_todo_arn   = module.alb.target_group_todo_arn
  subnet_pub01_id         = module.vpc.subnet_pub01_id
  subnet_pvt01_id         = module.vpc.subnet_pvt01_id
  subnet_pub02_id         = module.vpc.subnet_pub02_id
  subnet_pvt02_id         = module.vpc.subnet_pvt02_id
  sg_allow_http_id        = module.vpc.sg_allow_http_id
  sg_allow_mysql_id       = module.vpc.sg_allow_mysql_id
  sg_allow_consul_id      = module.vpc.sg_allow_consul_id

  tags = {
    domain = var.name
  }
}
