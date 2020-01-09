Under development. This is more of a scratch pad of notes than a how to at the moment.

## Prerequisites
* `kubectl`
* `docker` w/ Kubernetes support or your own Kubernetes cluster
* Private docker registry

## Notes
I am using an Amazon ECR in us-west-1 for my container registry. Use the AWS CLI to log in to the registry:

```
$(aws ecr get-login --no-include-email --region us-west-1)
```

Build the images and tag each.

```
AWS_ECR_REGISTRY=$(aws ecr get-login | awk '{print $9}' | cut -d '/' -f 3)

# From the k8s directory...
docker-compose build
docker tag k8s_ui ${AWS_ECR_REGISTRY}/hello_webapi/ui:latest
docker tag k8s_app ${AWS_ECR_REGISTRY}/hello_webapi/app:latest
docker tag k8s_db ${AWS_ECR_REGISTRY}/hello_webapi/db:latest
```

If you don't already have the repository created, create them:

```
aws ecr create-repository --repository-name=hello_webapi/ui
aws ecr create-repository --repository-name=hello_webapi/app
aws ecr create-repository --repository-name=hello_webapi/app
```

You should now be able to push images.

```
docker push ${AWS_ECR_REGISTRY}/hello_webapi/ui:latest
docker push ${AWS_ECR_REGISTRY}/hello_webapi/app:latest
docker push ${AWS_ECR_REGISTRY}/hello_webapi/db:latest
```

In order for kubernetes to be able to pull images from a private repository,
you need to create a kubernetes secret. Follow the instructions here:

https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/

Obtain your username, password, and repository url from the aws cli for the secrets.

```
aws ecr get-login
```

Once configured, kubernetes should be able to pull images.

Before actually running the application, we will need to create consul
pods or the application will not be able to function. I've created a bootstrap script to
take care of this step:

```
./bootstrap.sh
```

Once bootstrapped, fire your engines and hold on to your butts!

```
kubectl apply -f deployments -f services
```

TODO: nginx proxy... coming next!
