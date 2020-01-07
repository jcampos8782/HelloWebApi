# HelloWebApi

This is a sample application using .NET Core services with a ReactJS UI. This project uses Docker for local development and is simple to bootstrap and begin playing with. 

## Screenshots
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/light.png' width=250 />
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/dark.png' width=250 />
<img src='https://raw.githubusercontent.com/jcampos8782/HelloWebApi/master/img/modal.png' width=250 />

## Components
* React/Material-UI UI
  * http://localhost:8080
* To-Do List
  * http://localhost:3000
  * Postman collection available in the `postman` directory.
* Elasticsearch and Kibana
  * http://localhost:9200
* Kibana
  * http://localhost:5601
* Consul
  * http://localhost:8500
* RabbitMQ
  * http://localhost:15672


#### Future Enhancements

* Terraform - Deploy to AWS EKS and RDS with Terraform
* Data streams - Push changes to Kafka or RabbitMQ to feed into cache and search stacks
  * Caching - Some simple caching layers
  * Search - Elasticsearch support
* Health Checks - Health checks and monitoring
* Configuration
  * Store secrets in Vault or Docker/Kubernetes secrets API

## Getting Started

These instructions will get you running this application via a local docker/kubernetes installation
for testing purposes. Note that this is *NOT* production ready code or infrastructure!

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

#### Configuring Logs
The exchange for logs can only be set up once RMQ is up and running. To do so, run
```
docker ps | grep rabbitmq | awk {'print $1'} | xargs -I '{}' docker exec '{}' init-exchange.sh
```
OR create it from the RabbitMQ admin UI http://localhost:15672

#### Kubernetes

Kubernetes for docker will be coming soon!
