# HelloWebApi

This is a sample .NET Core web API application for experimenting with .NET microservices
running via docker/kubernetes on AWS.


#### Future Enhancements

* Configuration - ~Using Consul~ & Vault for configuration and secrets.
* Tests! - Unit testing is important!
* Terraform - Deploy to AWS EKS and RDS with Terraform
* Logging/Monitoring - Add logging and monitoring to an ELK (Elasticsearch, Logstash, Kibana) stack
* Stats - Statsd support w/ Graphite
* Health Checks - Health checks and monitoring
* Caching - Some simple caching layers
* Search - Elasticsearch support
* Data streams - Push changes to Kafka or RabbitMQ to feed into cache and search stacks
* UI - Simple React UI

## Getting Started

These instructions will get you running this application via a local docker/kubernetes installation
for testing purposes. Note that this is *NOT* production ready code or infrastructure!

### Prerequisites

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

#### Kubernetes

To run this application on docker's built in kubernetes cluster:

```
# Build 
docker-compose build

# Run in Kubernetes
docker stack deploy --compose-file kube-compose.yml hello-webapi
