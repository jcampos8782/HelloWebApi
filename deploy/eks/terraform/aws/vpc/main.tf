# Creates a VPC with two private and two public subnets. For more on this
# configuration, see https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html

resource "aws_vpc" "main" {
  cidr_block       = var.vpc_cidr
  instance_tenancy = "default"
  tags             = var.vpc_tags
}

# Two Public Subnets - Load Balancers
resource "aws_subnet" "subnet_pub01" {
  vpc_id                  = aws_vpc.main.id
  availability_zone       = var.vpc_subnet_01_az
  cidr_block              = var.vpc_subnet_pub01_cidr
  map_public_ip_on_launch = true
  tags                    = var.pub_subnet_tags
}

resource "aws_subnet" "subnet_pub02" {
  vpc_id                  = aws_vpc.main.id
  availability_zone       = var.vpc_subnet_02_az
  cidr_block              = var.vpc_subnet_pub02_cidr
  map_public_ip_on_launch = true
  tags                    = var.pub_subnet_tags
}

# Two Private Subnets - Workers
# Tag private subnets so that Kubernetes knows that it can use them for internal
# load balancers
resource "aws_subnet" "subnet_pvt01" {
  vpc_id            = aws_vpc.main.id
  availability_zone = var.vpc_subnet_01_az
  cidr_block        = var.vpc_subnet_pvt01_cidr
  tags              = var.pvt_subnet_tags
}

resource "aws_subnet" "subnet_pvt02" {
  vpc_id            = aws_vpc.main.id
  availability_zone = var.vpc_subnet_02_az
  cidr_block        = var.vpc_subnet_pvt02_cidr
  tags              = var.pvt_subnet_tags
}

# Public subnets should have a route to an internet gateway
resource "aws_internet_gateway" "inet_gateway" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "rt_pub" {
  vpc_id = aws_vpc.main.id

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
  vpc = true
}


resource "aws_eip" "ng02_eip" {
  vpc = true
}

resource "aws_nat_gateway" "nat_gateway_01" {
  allocation_id = aws_eip.ng01_eip.id
  subnet_id     = aws_subnet.subnet_pub01.id

  depends_on = [
    aws_eip.ng01_eip,
    aws_internet_gateway.inet_gateway
  ]
}

resource "aws_nat_gateway" "nat_gateway_02" {
  allocation_id = aws_eip.ng02_eip.id
  subnet_id     = aws_subnet.subnet_pub02.id

  depends_on = [
    aws_eip.ng02_eip,
    aws_internet_gateway.inet_gateway
  ]
}

resource "aws_route_table" "rt_pvt01" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.nat_gateway_01.id
  }
}

resource "aws_route_table" "rt_pvt02" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.nat_gateway_02.id
  }
}

resource "aws_route_table_association" "rta_subnet_pvt01" {
  subnet_id      = aws_subnet.subnet_pvt01.id
  route_table_id = aws_route_table.rt_pvt01.id
}

resource "aws_route_table_association" "rta_subnet_pvt02" {
  subnet_id      = aws_subnet.subnet_pvt02.id
  route_table_id = aws_route_table.rt_pvt02.id
}
