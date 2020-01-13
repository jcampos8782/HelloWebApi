variable "cluster_name" {}
variable "kubernetes_version" {}
variable "role_arn" {}
variable "subnet_ids" {}

variable "cluster_log_types" {
  default = []
}
