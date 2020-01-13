variable "debug" {
  default = false
}

# General AWS Settings
variable "region" {
  default = "us-west-2"
}

# VPC Configuration
variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "vpc_subnet_01_az" {
  default = "us-west-2a"
}

variable "vpc_subnet_02_az" {
  default = "us-west-2b"
}

variable "vpc_subnet_pub01_cidr" {
  default = "10.0.0.0/24"
}

variable "vpc_subnet_pub02_cidr" {
  default = "10.0.1.0/24"
}

variable "vpc_subnet_pvt01_cidr" {
  default = "10.0.2.0/24"
}

variable "vpc_subnet_pvt02_cidr" {
  default = "10.0.3.0/24"
}

# Kubernetes Configuration
variable "kubernetes_version" {
  default = "1.14"
}
