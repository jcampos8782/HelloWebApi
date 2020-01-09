# Kubernetes
This is still a bit of a work in progress, but running this application in Kubernetes
is fairly straightforward.

## Prerequisites
* `kubectl`
* `docker` w/ Kubernetes support or your own Kubernetes cluster
* AWS CLI (Optional, but will save you some time and makes scripting this a bit easier)
* Private docker registry (I recommend AWS ECR)

## Before You Start...

You will either need to add an app.local entry to your /etc/hosts file to point back to
the of where you will be running this app (localhost for me) OR you will need to
update `ui/.env.production.local` and change the `REACT_APP_TODO_URL`. The value is
established at *build* time, so do so *before* you build the images. For me, its just
easier to make changes to my host file :). If you want to get really fancy, you
could stand up a DNS server but that seemed like overkill for development purposes. 

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
docker tag k8s_nginx ${AWS_ECR_REGISTRY}/hello_webapi/nginx:latest
```

If you don't already have the repository created, create them:

```
aws ecr create-repository --repository-name=hello_webapi/ui
aws ecr create-repository --repository-name=hello_webapi/app
aws ecr create-repository --repository-name=hello_webapi/app
aws ecr create-repository --repository-name=hello_webapi/nginx
```

You should now be able to push images.

```
docker push ${AWS_ECR_REGISTRY}/hello_webapi/ui:latest
docker push ${AWS_ECR_REGISTRY}/hello_webapi/app:latest
docker push ${AWS_ECR_REGISTRY}/hello_webapi/db:latest
docker push ${AWS_ECR_REGISTRY}/hello_webapi/nginx:latest
```

In order for kubernetes to be able to pull images from a private repository,
you need to create a kubernetes secret. Follow the instructions here:

https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/

Obtain your username, password, and repository url from the aws cli for the secrets.

```
aws ecr get-login
```

Once configured, kubernetes should be able to pull images from your private repository.

Next, you will need to update each of the deployment yml files to use your registry
and image pull secrets.

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

If all worked as planned (WOMM!!!!), you should be ready to port-forward nginx
and launch the app locally:

```
kubectl port-forward $(kubectl get pods | grep nginx | awk '{print $1}') 8080:80
```

Open up your browser to http://localhost:8080 and try it out!

## Next Steps
* Set up a kube context for Amazon EKS and launch this application
onto a cloud cluster fronted with an ELB. This may be too much indirection (ELB -> Nginx)
but it does provide some flexibility and retains portability to other cloud providers like
GCS or Azure.

* Terraform ALL THE THINGS!
