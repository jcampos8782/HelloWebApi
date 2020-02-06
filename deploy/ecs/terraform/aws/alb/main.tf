// Creates an application load balancer which distributes traffic to tasks
// in the two public subnets.

resource "aws_lb" "main" {
  name_prefix        = substr(var.name, 0, 6)
  internal           = false
  load_balancer_type = "application"
  security_groups    = var.security_group_ids
  subnets            = var.subnet_ids

  tags = var.tags
}

resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ui.arn
  }

  depends_on = [
    aws_lb.main,
    aws_alb_target_group.ui
  ]
}

resource "aws_alb_target_group" "ui" {
  name_prefix = "ui"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_id

  health_check {
    path = ""
  }

  depends_on = [aws_lb.main]
}

resource "aws_alb_target_group" "aws" {
  name_prefix = "aws"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_id

  health_check {
    path = "/actuator/health"
  }

  depends_on = [aws_lb.main]
}

resource "aws_alb_target_group" "todo" {
  name_prefix = "todo"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_id

  health_check {
    path = "/api/todoitems"
  }

  depends_on = [aws_lb.main]
}

resource "aws_lb_listener_rule" "aws" {
  listener_arn = aws_lb_listener.http_listener.arn
  priority     = 101

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.aws.arn
  }

  condition {
    path_pattern {
      values = ["/api/aws/*"]
    }
  }

  depends_on = [aws_alb_target_group.aws]
}

resource "aws_lb_listener_rule" "todo" {
  listener_arn = aws_lb_listener.http_listener.arn
  priority     = 102

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.todo.arn
  }

  condition {
    path_pattern {
      values = ["/api/todoitems", "/api/todoitems/*"]
    }
  }

  depends_on = [aws_alb_target_group.todo]
}
