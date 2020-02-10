data "aws_iam_role" "task_execution_role" {
  name = "ecsTaskExecutionRole"
}

resource "aws_ecs_cluster" "main" {
  name               = var.name
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]
  tags               = var.tags
}

resource "aws_ecs_task_definition" "aws" {
  family                   = "jsoncampos-aws"
  container_definitions    = file("ecs/tasks/aws.json")
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = data.aws_iam_role.task_execution_role.arn
}

resource "aws_ecs_task_definition" "todo" {
  family                   = "jsoncampos-todo"
  container_definitions    = file("ecs/tasks/todo.json")
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = data.aws_iam_role.task_execution_role.arn
}

resource "aws_ecs_task_definition" "mysql" {
  family                   = "jsoncampos-mysql"
  container_definitions    = file("ecs/tasks/mysql.json")
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = data.aws_iam_role.task_execution_role.arn
}

resource "aws_ecs_service" "aws" {
  name            = "aws"
  launch_type     = "FARGATE"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.aws.arn
  desired_count   = 1

  depends_on = [aws_ecs_cluster.main, aws_ecs_task_definition.aws]

  load_balancer {
    target_group_arn = var.target_group_aws_arn
    container_name   = "aws"
    container_port   = 8080
  }

  network_configuration {
    subnets          = [var.subnet_pub01_id, var.subnet_pub02_id]
    security_groups  = [var.sg_allow_http_id]
    assign_public_ip = true
  }
}

resource "aws_ecs_service" "todo" {
  name            = "todo"
  launch_type     = "FARGATE"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.todo.arn
  desired_count   = 1

  depends_on = [aws_ecs_cluster.main, aws_ecs_task_definition.todo]

  load_balancer {
    target_group_arn = var.target_group_todo_arn
    container_name   = "todo"
    container_port   = 80
  }

  network_configuration {
    subnets          = [var.subnet_pub01_id, var.subnet_pub02_id]
    security_groups  = [var.sg_allow_http_id]
    assign_public_ip = true
  }
}

// Private services
resource "aws_ecs_service" "mysql" {
  name            = "mysql"
  launch_type     = "FARGATE"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.mysql.arn
  desired_count   = 1

  depends_on = [aws_ecs_cluster.main, aws_ecs_task_definition.mysql]

  network_configuration {
    subnets         = [var.subnet_pvt01_id, var.subnet_pvt02_id]
    security_groups = [var.sg_allow_mysql_id]
  }

  service_registries {
    registry_arn = aws_service_discovery_service.mysql.arn
  }
}

resource "aws_service_discovery_service" "mysql" {
  name = "mysql"

  dns_config {
    namespace_id = var.service_discovery_ns_id

    dns_records {
      ttl  = 60
      type = "A"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 1
  }
}
