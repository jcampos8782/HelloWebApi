# Deploying to AWS
This project includes everything required to create an EC2 instance running Docker for a web-facing application.

## Prerequisites
* An AWS account.
* `~/.aws/credentials` file

## Provisioning
To provision the AWS resources, simply initialize the terraform provisioner and them apply!

```
terraform init
terraform apply
```

There is no need to change any configurations
or variables, but if you would like to customize the deployment edit the `terraform.tfvars` file.

## Deploying the Application
TODO
