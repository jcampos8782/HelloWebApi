# HelloWebApi

This is an example full stack application utilizing technologies such as .NET Core,
ReactJS, Material-UI, Docker, Kubernetes, Chef, Vagrant, and Terraform. 

## Screenshots
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/light.png' width=250 />
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/dark.png' width=250 />
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/aws_architecture.png' width=250 />

## Components
All required and optional components are included with this project.

Terraform Support:
 * AWS EKS
 * AWS ECS

Primary Components:
* React/Material-UI UI
* .NET Core To-Do List Service
* Spring Boot AWS Service Catalog

Required Infrastructure Components:
* MySQL
  * RDBMS for To-Do List service

Optional Infrastructure Components:
* RabbitMQ
  * Log exchange/buffer
* Logstash
  * Log aggregration
* Elasticsearch
  * Log indexing
* Kibana
  * Monitoring

#### Future Enhancements

* Health Checks - Health checks and monitoring
* Data streams - Push changes to Kafka or RabbitMQ to feed into cache and search stacks
  * Caching - Some simple caching layers
  * Search - Elasticsearch support
* Configuration
  * Store secrets in Vault or Docker/Kubernetes secrets API

## Getting Started

### Development
I have provided a `Vagrantfile` which will provision a Vagrant box which has the environment
set up to execute this application as if it were deployed into the cloud.

The provided `docker-compose.yml` configures custom images that will bootstrap all primary components of the application and
spin up the optional components.

#### Prerequisites

* `vagrant`
* VirtualBox

#### Building

To build and run all components of the application, start your Vagrant box and then
ssh into the running machine.

```
vagrant up
vagrant ssh
```

Once inside the machine,

```
cd /vagrant
docker-compose up -d
```

Once running, you should be able to browse to http://localhost:8000 in your browser
to see the application running.  

#### AWS
For deployment onto the AWS Cloud, see the [terraform/eks](./terraform/eks) and [terraform/ecs](./terraform/ecs) pages.
