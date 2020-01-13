provider "aws" {
  region = var.aws_region
}

module "iam" {
  source = "./iam/"
}

module "vpc" {
  source                = "./vpc"
  vpc_cidr              = var.vpc_cidr
  vpc_subnet_01_az      = var.vpc_subnet_01_az
  vpc_subnet_02_az      = var.vpc_subnet_02_az
  vpc_subnet_pub01_cidr = var.vpc_subnet_pub01_cidr
  vpc_subnet_pub02_cidr = var.vpc_subnet_pub02_cidr
  vpc_subnet_pvt01_cidr = var.vpc_subnet_pvt01_cidr
  vpc_subnet_pvt02_cidr = var.vpc_subnet_pvt02_cidr

  vpc_tags = {
    "kubernetes.io/cluster/${var.eks_cluster_name}" = "shared"
  }

  pub_subnet_tags = {
    "kubernetes.io/role/elb"                        = "1"
    "kubernetes.io/cluster/${var.eks_cluster_name}" = "shared"
  }

  pvt_subnet_tags = {
    "kubernetes.io/role/internal-elb"               = "1",
    "kubernetes.io/cluster/${var.eks_cluster_name}" = "shared"
  }
}

module "eks" {
  source             = "./eks"
  kubernetes_version = var.kubernetes_version

  cluster_name     = var.eks_cluster_name
  cluster_role_arn = module.iam.eks_cluster_role_arn

  subnet_ids = [
    module.vpc.subnet_pub01_id,
    module.vpc.subnet_pub02_id,
    module.vpc.subnet_pvt01_id,
    module.vpc.subnet_pvt02_id
  ]

  node_group_name           = var.eks_node_group_name
  node_group_role_arn       = module.iam.eks_node_group_role_arn
  node_group_desired_size   = var.eks_node_group_desired_size
  node_group_min_size       = var.eks_node_group_min_size
  node_group_max_size       = var.eks_node_group_max_size
  node_group_ami_type       = var.eks_node_group_ami_type
  node_group_instance_types = var.eks_node_group_instance_types
  node_group_disk_size      = var.eks_node_group_disk_size
}
