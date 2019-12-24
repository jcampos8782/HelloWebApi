#HelloWebApi

This is a sample .NET Core web API application for experimenting with .NET microservices
running via docker/kubernetes on AWS. 


#### Future Enhancements

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

# Navigate to the web application folder
cd HelloWebApi/HelloWebApi

# Build the project
./build.sh

# Spin up the docker containers
docker-compose up -d

# Prepare the database
cd db
./create_db.sh

cd ..
```

To verify, run `docker ps` and verify the `hellowebapi_app` and `mysql` containers are up and running.

#### Kubernetes

If you want to run this application via a local kubernetes cluster (the one provided with your Docker installation),
replace `docker-compose up -d` with `docker stack deploy --compose-file kube-compose.yml hello-web-api` in the previous steps.
