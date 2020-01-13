variable "cluster_name" {}
variable "kubernetes_version" {}
variable "cluster_role_arn" {}
variable "subnet_ids" {}

variable "cluster_log_types" {
  default = []
}

variable "node_group_name" {}
variable "node_group_role_arn" {}
variable "node_group_desired_size" {}
variable "node_group_min_size" {}
variable "node_group_max_size" {}
variable "node_group_ami_type" {}
variable "node_group_disk_size" {}
variable "node_group_instance_types" {}
