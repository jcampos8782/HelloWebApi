output "load_balancer_id" {
  value = aws_lb.main.id
}

output "load_balancer_dns" {
  value = aws_lb.main.dns_name
}

output "target_group_ui_arn" {
  value = aws_alb_target_group.ui.arn
}

output "target_group_aws_arn" {
  value = aws_alb_target_group.aws.arn
}

output "target_group_todo_arn" {
  value = aws_alb_target_group.todo.arn
}
