output "update_kubeconfig_cmd" {
  value = "aws eks --region ${var.region} update-kubeconfig --name ${var.cluster_name}"
}
