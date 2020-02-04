variable "debug" {
  description = "Enable debug settings"
  default     = false
}

# Kubernetes Configuration
variable "kubernetes_version" {
  description = "Kubernetes version. Must be supported by Amazon EKS in the deployed region."
  default     = "1.14"
}

# General AWS Settings
variable "aws_region" {
  description = "The AWS regions in which this application should be deployed"
}

# VPC Configuration
variable "vpc_cidr" {}
variable "vpc_subnet_01_az" {
  description = "Subnet in which to deploy EKS cluster workers. Should differ from vpc_subnet_02_az"
}
variable "vpc_subnet_02_az" {
  description = "Subnet in which to deploy EKS cluster workers. Should differ from vpc_subnet_01_az"
}
variable "vpc_subnet_pub01_cidr" {
  description = "CIDR block of the public subnet in AZ 01"
}
variable "vpc_subnet_pub02_cidr" {
  description = "CIDR block of the public subnet in AZ 02"
}
variable "vpc_subnet_pvt01_cidr" {
  description = "CIDR block of the private subnet in AZ 01"
}
variable "vpc_subnet_pvt02_cidr" {
  description = "CIDR block of the private subnet in AZ 02"
}

# EKS
variable "eks_cluster_name" {}
variable "eks_node_group_name" {}
variable "eks_node_group_desired_size" {}
variable "eks_node_group_min_size" {}
variable "eks_node_group_max_size" {}
variable "eks_node_group_ami_type" {}
variable "eks_node_group_instance_types" {}
variable "eks_node_group_disk_size" {}
