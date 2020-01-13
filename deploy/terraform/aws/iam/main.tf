# IAM Roles and policies for cluster and resource management
data "aws_iam_policy_document" "eks_assume_policy_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "demo_app_eks_service_role" {
  name               = "demo_app_eks_service_role"
  assume_role_policy = data.aws_iam_policy_document.eks_assume_policy_role.json
}

resource "aws_iam_policy_attachment" "iam_policy_attach_cluster_policy" {
  name       = "AmazonEKSClusterPolicy"
  roles      = [aws_iam_role.demo_app_eks_service_role.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_iam_policy_attachment" "iam_policy_attach_service_policy" {
  name       = "AmazonEKSServicePolicy"
  roles      = [aws_iam_role.demo_app_eks_service_role.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSServicePolicy"
}
