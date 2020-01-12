consul_pod=$(kubectl get pods | grep consul | awk '{print $1}')

if [ -z "$consul_pod" ]; then
  echo "Deploying Consul..."
  kubectl apply -f deployments/consul.yml

  while [ $(kubectl get pods | grep -iE "consul.*running*" | wc -l) -lt 1 ]; do
    echo "Waiting for Consul to be ready..."
    sleep 1
  done
fi

echo ""
echo "Importing keys to consul..."
keys=$(cat ../dev/consul/values.json) > /dev/null
kubectl get pods | grep consul | awk '{print $1}' | xargs -I '{}' kubectl exec {} consul kv import "$keys"
