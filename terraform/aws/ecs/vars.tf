variable "debug" {
  description = "Enable debug settings"
  default     = false
}

# General AWS Settings
variable "aws_region" {
  description = "The AWS regions in which this application should be deployed"
}

variable "name" {
  description = "Name associated with the resources being launched"
}

# DNS For Service discovery
variable "dns_namespace" {
  description = "DNS namespace for private discovery"
}

# VPC Configuration
variable "vpc_cidr" {}

variable "vpc_subnet_01_az" {
  description = "Subnet in which to deploy EC2 Instance"
}

variable "vpc_subnet_02_az" {
  description = "Subnet in which to deploy EC2 Instance"
}

variable "vpc_subnet_pub01_cidr" {
  description = "CIDR block of the public subnet in AZ 01"
}

variable "vpc_subnet_pvt01_cidr" {
  description = "CIDR block of the private subnet in AZ 01"
}

variable "vpc_subnet_pub02_cidr" {
  description = "CIDR block of the public subnet in AZ 02"
}

variable "vpc_subnet_pvt02_cidr" {
  description = "CIDR block of the private subnet in AZ 02"
}
