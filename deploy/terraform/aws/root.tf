provider "aws" {
  region = var.region
}

module "iam" {
  source = "./iam/"
}

module "vpc" {
  source                = "./vpc"
  cluster_name          = var.cluster_name
  vpc_cidr              = var.vpc_cidr
  vpc_subnet_01_az      = var.vpc_subnet_01_az
  vpc_subnet_02_az      = var.vpc_subnet_02_az
  vpc_subnet_pub01_cidr = var.vpc_subnet_pub01_cidr
  vpc_subnet_pub02_cidr = var.vpc_subnet_pub02_cidr
  vpc_subnet_pvt01_cidr = var.vpc_subnet_pvt01_cidr
  vpc_subnet_pvt02_cidr = var.vpc_subnet_pvt02_cidr
}

module "eks" {
  source             = "./eks"
  cluster_name       = var.cluster_name
  kubernetes_version = var.kubernetes_version
  role_arn           = module.iam.iam_role_arn
  subnet_ids = [
    module.vpc.subnet_pvt01_id,
    module.vpc.subnet_pvt02_id
  ]
}
