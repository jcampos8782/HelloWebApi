# HelloWebApi

This is a sample application using .NET Core services with a ReactJS UI. This project uses Docker for local development and is simple to bootstrap and begin playing with.

## Screenshots
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/light.png' width=250 />
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/dark.png' width=250 />
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/modal.png' width=250 />

## Components
All required and optional components are included with this project.

Runtime Platforms:
* Docker
* Kubernetes

Primary Components:
* React/Material-UI UI
* .NET Core To-Do List Service

Required Infrastructure Components:
* Consul
  * Provides configuration to the To-Do List service
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

* Kubernetes
  * AWS EKS
* Terraform - Deploy to AWS EKS and RDS with Terraform
* Data streams - Push changes to Kafka or RabbitMQ to feed into cache and search stacks
  * Caching - Some simple caching layers
  * Search - Elasticsearch support
* Health Checks - Health checks and monitoring
* Configuration
  * Store secrets in Vault or Docker/Kubernetes secrets API

## Getting Started

It is recommended that you run this project using Docker. The provided `docker-compose.yml`
configures custom images that will bootstrap all primary components of the application and
spin up the optional components.

Alternatively, kubernetes deployment and service files are provided for running the
required components. However, bootstrapping must be done manually (see instructions below)
and requires some modifications to the supplied deployment files. Eventually, these
things will be ironed out and kubernetes will be a fully supported deployment mode.

### Prerequisites

* `docker`
* `docker-compose`

### Building

This entire project can be built and started with docker-compose:

```
# Clone this repository
git clone git@github.com:jcampos8782/HelloWebApi.git

# Use docker-compose to build
docker-compose build

# Spin up the docker containers
docker-compose up -d
```

Verify that the application is running by navigating to http://localhost:8080

The following is a list of all exposed services:
* To-Do Service - http://localhost:3000
* Consul - http://localhost:8500/ui
* RabbitMQ - http://localhost:15672
* Kibana - http://localhost:5671
* Elasticsearch - http://localhost:9200

#### Troubleshooting
Occasionally the consul configuration store will take longer to create than the
To-Do service and the service fails to start. If
#### Configuring Logs
The exchange for logs can only be set up once RMQ is up and running. To do so, run
```
docker ps | grep rabbitmq | awk {'print $1'} | xargs -I '{}' docker exec '{}' init-exchange.sh
```
OR create it from the RabbitMQ admin UI http://localhost:15672

### Kubernetes

Check out the `k8s` folder for a guide on running this application on a Kube cluster.
