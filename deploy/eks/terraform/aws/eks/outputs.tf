output "endpoint" {
  value = aws_eks_cluster.main.endpoint
}

output "kubeconfig-ca-data" {
  value = aws_eks_cluster.main.certificate_authority.0.data
}
