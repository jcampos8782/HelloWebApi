provider "aws" {
  region = var.region
}

module "iam" {
  source = "./iam/"
}

module "vpc" {
  source                      = "./vpc"
  vpc_cidr                    = var.vpc_cidr
  vpc_subnet_01_az            = var.vpc_subnet_01_az
  vpc_subnet_02_az            = var.vpc_subnet_02_az
  vpc_subnet_pub01_cidr       = var.vpc_subnet_pub01_cidr
  vpc_subnet_pub02_cidr       = var.vpc_subnet_pub02_cidr
  vpc_subnet_pvt01_cidr       = var.vpc_subnet_pvt01_cidr
  vpc_subnet_pvt02_cidr       = var.vpc_subnet_pvt02_cidr
  vpc_subnet_create_public_ip = var.debug_mode
}
