variable "name" {}
variable "tags" {
  default = {}
}

variable "service_discovery_ns_id" {}

variable "target_group_ui_arn" {}
variable "target_group_aws_arn" {}
variable "target_group_todo_arn" {}

variable "subnet_pub01_id" {}
variable "subnet_pvt01_id" {}
variable "subnet_pub02_id" {}
variable "subnet_pvt02_id" {}

variable "sg_allow_http_id" {}
variable "sg_allow_mysql_id" {}
variable "sg_allow_consul_id" {}
