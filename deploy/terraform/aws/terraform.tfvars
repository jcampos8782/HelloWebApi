debug = false

# General AWS Settings
aws_region = "us-west-2"

# VPC Configuration
vpc_cidr              = "10.0.0.0/16"
vpc_subnet_01_az      = "us-west-2a"
vpc_subnet_02_az      = "us-west-2b"
vpc_subnet_pub01_cidr = "10.0.0.0/24"
vpc_subnet_pub02_cidr = "10.0.1.0/24"
vpc_subnet_pvt01_cidr = "10.0.2.0/24"
vpc_subnet_pvt02_cidr = "10.0.3.0/24"

# Kubernetes Configuration
kubernetes_version = "1.14"

# EKS Cluster Configuration
eks_cluster_name              = "main"
eks_node_group_name           = "main"
eks_node_group_desired_size   = 2
eks_node_group_min_size       = 2
eks_node_group_max_size       = 3
eks_node_group_ami_type       = "AL2_x86_64"
eks_node_group_instance_types = ["t3.medium"]
eks_node_group_disk_size      = 20
