resource "aws_eks_cluster" "main" {

  name                      = var.cluster_name
  version                   = var.kubernetes_version
  enabled_cluster_log_types = var.cluster_log_types
  role_arn                  = var.role_arn

  vpc_config {
    subnet_ids = var.subnet_ids
  }

}
