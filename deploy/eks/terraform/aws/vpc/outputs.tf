output vpc_id {
  value = aws_vpc.main.id
}

output "vpc_arn" {
  value = aws_vpc.main.arn
}

output "subnet_pub01_arn" {
  value = aws_subnet.subnet_pub01.arn
}

output "subnet_pub02_arn" {
  value = aws_subnet.subnet_pub02.arn
}

output "subnet_pvt01_arn" {
  value = aws_subnet.subnet_pvt01.arn
}

output "subnet_pvt02_arn" {
  value = aws_subnet.subnet_pvt02.arn
}

output "subnet_pub01_id" {
  value = aws_subnet.subnet_pub01.id
}

output "subnet_pub02_id" {
  value = aws_subnet.subnet_pub02.id
}

output "subnet_pvt01_id" {
  value = aws_subnet.subnet_pvt01.id
}

output "subnet_pvt02_id" {
  value = aws_subnet.subnet_pvt02.id
}
