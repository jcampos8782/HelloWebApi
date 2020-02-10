# Deploying to AWS
This project includes everything required to create an EKS Cluster into the AWS cloud.

## Architecture
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/aws_architecture.png' width=500 />

## Prerequisites
* An AWS account.
* `~/.aws/credentials` file
* Deploy to a zone with EKS (I use us-west-2)

## Provisioning
To provision the AWS resources, simply initialize the terraform provisioner and them apply! 

```
terraform init
terraform apply
```

There is no need to change any configurations
or variables, but if you would like to customize the deployment edit the `terraform.tfvars` file.

## Deploying Pods
Follow the steps in the [kubernetes](../k8s) section to build your docker containers. To deploy your pods onto your provisioned
cluster, add this cluster to your kubernetes context

```
aws eks --region <region> update-kubeconfig --name <cluster name>
```

To confirm connectivity, run `kubectl get nodes`. You should see your AWS nodes listed as resources.
