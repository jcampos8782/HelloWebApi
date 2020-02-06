# HelloWebApi

This is a sample full stack application utilizing technologies such as .NET Core, ReactJS, Material-UI, Docker, Kubernetes, and Terraform. You can have this application running on the AWS Cloud on EKS with minimal setup -- all steps are documented and the Terraform resources are all included.

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

* Health Checks - Health checks and monitoring
* Data streams - Push changes to Kafka or RabbitMQ to feed into cache and search stacks
  * Caching - Some simple caching layers
  * Search - Elasticsearch support
* Configuration
  * Store secrets in Vault or Docker/Kubernetes secrets API

## Getting Started

### Development
The provided `docker-compose.yml` configures custom images that will bootstrap all primary components of the application and
spin up the optional components.

#### Prerequisites

* `docker`
* `docker-compose`

#### Building

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

### "Production"
Note the quotes... this is *not* a production application!

#### AWS
For deployment onto the AWS Cloud, see the [deploy/eks](./deploy/eks) and [deploy/ecs](./deploy/ecs) pages.
