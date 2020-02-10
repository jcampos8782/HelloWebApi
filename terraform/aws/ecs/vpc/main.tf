# Creates a VPC with two private and two public subnets. For more on this
# configuration, see https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  tags                 = var.tags
  enable_dns_support   = true
  enable_dns_hostnames = true
}

# Two Public Subnets - Load Balancers
resource "aws_subnet" "subnet_pub01" {
  vpc_id                  = aws_vpc.main.id
  availability_zone       = var.vpc_subnet_01_az
  cidr_block              = var.vpc_subnet_pub01_cidr
  map_public_ip_on_launch = true
  tags                    = var.tags
}

resource "aws_subnet" "subnet_pub02" {
  vpc_id                  = aws_vpc.main.id
  availability_zone       = var.vpc_subnet_02_az
  cidr_block              = var.vpc_subnet_pub02_cidr
  map_public_ip_on_launch = true
  tags                    = var.tags
}

# Two Private Subnets - Workers
# Tag private subnets so that Kubernetes knows that it can use them for internal
# load balancers
resource "aws_subnet" "subnet_pvt01" {
  vpc_id            = aws_vpc.main.id
  availability_zone = var.vpc_subnet_01_az
  cidr_block        = var.vpc_subnet_pvt01_cidr
  tags              = var.tags
}

resource "aws_subnet" "subnet_pvt02" {
  vpc_id            = aws_vpc.main.id
  availability_zone = var.vpc_subnet_02_az
  cidr_block        = var.vpc_subnet_pvt02_cidr
  tags              = var.tags
}

# Public subnets should have a route to an internet gateway
resource "aws_internet_gateway" "inet_gateway" {
  vpc_id = aws_vpc.main.id
  tags   = var.tags
}

resource "aws_route_table" "rt_pub" {
  vpc_id = aws_vpc.main.id
  tags   = var.tags

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.inet_gateway.id
  }
}

resource "aws_route_table_association" "rta_subnet_pub01" {
  subnet_id      = aws_subnet.subnet_pub01.id
  route_table_id = aws_route_table.rt_pub.id
}

resource "aws_route_table_association" "rta_subnet_pub02" {
  subnet_id      = aws_subnet.subnet_pub02.id
  route_table_id = aws_route_table.rt_pub.id
}

# Instances in the Pvt subnet use a NAT Gateway to be able to send outbound
# traffic to the internate
resource "aws_eip" "ng01_eip" {
  vpc  = true
  tags = var.tags
}

resource "aws_nat_gateway" "nat_gateway_01" {
  allocation_id = aws_eip.ng01_eip.id
  subnet_id     = aws_subnet.subnet_pub01.id
  tags          = var.tags

  depends_on = [
    aws_eip.ng01_eip,
    aws_internet_gateway.inet_gateway
  ]
}

resource "aws_route_table" "rt_pvt01" {
  vpc_id = aws_vpc.main.id
  tags   = var.tags

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gateway_01.id
  }
}

resource "aws_route_table_association" "rta_subnet_pvt01" {
  subnet_id      = aws_subnet.subnet_pvt01.id
  route_table_id = aws_route_table.rt_pvt01.id
}

resource "aws_route_table_association" "rta_subnet_pvt02" {
  subnet_id      = aws_subnet.subnet_pvt02.id
  route_table_id = aws_route_table.rt_pvt01.id
}

// Security groups
resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  description = "Allow HTTP inbound traffic"
  vpc_id      = aws_vpc.main.id
  tags        = var.tags

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = [var.vpc_subnet_pub01_cidr, var.vpc_subnet_pub02_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  depends_on = [
    aws_subnet.subnet_pub01,
    aws_subnet.subnet_pub02
  ]
}

// Allows connections to port 3306 from resources in the public subnet
resource "aws_security_group" "allow_mysql" {
  name        = "allow_mysql"
  description = "Allow incoming connections on port 3306"
  vpc_id      = aws_vpc.main.id
  tags        = var.tags

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [var.vpc_subnet_pub01_cidr, var.vpc_subnet_pub02_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  depends_on = [
    aws_subnet.subnet_pub01,
    aws_subnet.subnet_pub02
  ]
}
