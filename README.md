# HelloWebApi

This is a sample .NET Core web API application for experimenting with .NET microservices
running via docker/kubernetes on AWS.

## Components
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

* UI - Simple React UI
* Terraform - Deploy to AWS EKS and RDS with Terraform
* Data streams - Push changes to Kafka or RabbitMQ to feed into cache and search stacks
* Caching - Some simple caching layers
* Search - Elasticsearch support
* Health Checks - Health checks and monitoring
* Configuration
  * Store secrets in Vault or Docker/Kubernetes secrets API
* Tests! - Unit testing is important!
* Logging/Monitoring - Add logging and monitoring to an ELK (Elasticsearch, Logstash, Kibana) stack
  * Configure Kibana dashboards
* Stats - Statsd support w/ Graphite

## Getting Started

These instructions will get you running this application via a local docker/kubernetes installation
for testing purposes. Note that this is *NOT* production ready code or infrastructure!

### Prerequisites

* ReactJS
* `npm`
* `docker`
* `docker-compose`

Its not necessary, but if you would like to run this in a local kubernetes cluster via the
`docker stack` command, you will need to enable kubernetes on your local docker setup.

### Building

This example comes with a simple build script to get your application packaged and running on
docker in just a couple steps:

#### Docker
```
# Clone this repository
git clone git@github.com:jcampos8782/HelloWebApi.git

# Use docker-compose to build
docker-compose build

# Spin up the docker containers
docker-compose up -d
```

To verify, run `docker ps` and verify the `hellowebapi` and `hellowebapi_mysql_1` containers are up and running.

#### Configuring Logs
The exchange for logs can only be set up once RMQ is up and running. To do so, run
```
docker ps | grep rabbitmq | awk {'print $1'} | xargs -I '{}' docker exec '{}' init-exchange.sh
```
OR create it from the RabbitMQ admin UI http://localhost:15672

#### Kubernetes

Kubernetes for docker will be coming soon!
