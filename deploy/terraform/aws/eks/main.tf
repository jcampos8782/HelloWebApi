resource "aws_eks_cluster" "main" {

  name                      = var.cluster_name
  version                   = var.kubernetes_version
  enabled_cluster_log_types = var.cluster_log_types
  role_arn                  = var.cluster_role_arn

  vpc_config {
    subnet_ids = var.subnet_ids
  }
}

resource "aws_eks_node_group" "main" {
  node_group_name = var.node_group_name
  cluster_name    = aws_eks_cluster.main.name

  # Auth
  node_role_arn = var.node_group_role_arn

  # Networking
  subnet_ids = var.subnet_ids

  # Resource allocation
  ami_type       = var.node_group_ami_type
  disk_size      = var.node_group_disk_size
  instance_types = var.node_group_instance_types

  scaling_config {
    desired_size = var.node_group_desired_size
    min_size     = var.node_group_min_size
    max_size     = var.node_group_max_size
  }
}
