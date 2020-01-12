resource "aws_vpc" "main" {
  cidr_block       = var.vpc_cidr
  instance_tenancy = "default"
}

# Two Public Subnets - Load Balancers
resource "aws_subnet" "subnet_pub01" {
  vpc_id                  = aws_vpc.main.id
  availability_zone       = var.vpc_subnet_01_az
  cidr_block              = var.vpc_subnet_pub01_cidr
  map_public_ip_on_launch = true

  tags = {
    "kubernetes.io/role/elb" = "1"
  }
}

resource "aws_subnet" "subnet_pub02" {
  vpc_id                  = aws_vpc.main.id
  availability_zone       = var.vpc_subnet_02_az
  cidr_block              = var.vpc_subnet_pub02_cidr
  map_public_ip_on_launch = true

  tags = {
    "kubernetes.io/role/elb" = "1"
  }
}

# Two Private Subnets - Workers
# Tag private subnets so that Kubernetes knows that it can use them for internal
# load balancers
resource "aws_subnet" "subnet_pvt01" {
  vpc_id            = aws_vpc.main.id
  availability_zone = var.vpc_subnet_01_az
  cidr_block        = var.vpc_subnet_pvt01_cidr

  tags = {
    "kubernetes.io/role/internal-elb" = "1"
  }
}

resource "aws_subnet" "subnet_pvt02" {
  vpc_id            = aws_vpc.main.id
  availability_zone = var.vpc_subnet_02_az
  cidr_block        = var.vpc_subnet_pvt02_cidr

  tags = {
    "kubernetes.io/role/internal-elb" = "1"
  }
}

# Internet gateway and routing for public subnets
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

# Associate the routing table with each public subnet
resource "aws_route_table_association" "rta_subnet_pub01" {
  subnet_id      = aws_subnet.subnet_pub01.id
  route_table_id = aws_route_table.rt_pub.id
}

resource "aws_route_table_association" "rta_subnet_pub02" {
  subnet_id      = aws_subnet.subnet_pub02.id
  route_table_id = aws_route_table.rt_pub.id
}
