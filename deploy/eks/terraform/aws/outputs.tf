output "update_kubeconfig_cmd" {
  value = "aws eks --region ${var.aws_region} update-kubeconfig --name ${var.eks_cluster_name}"
}
