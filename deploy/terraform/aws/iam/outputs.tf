output "iam_role_id" {
  value = aws_iam_role.demo_app_eks_service_role.id
}

output "iam_role_arn" {
  value = aws_iam_role.demo_app_eks_service_role.arn
}
