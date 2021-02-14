echo "Configuring shell to connect to EKS cluster..."
aws eks --region $AWS_REGION update-kubeconfig --name v1commerce

kubectl get svc

echo "Setting Kube Vars..."

if [[ $(cat $TRAVIS_BUILD_DIR/cloudformation.output) =~ RDSEndpoint=(.+.com) ]]; then
  echo ${BASH_REMATCH[1]}

  if ! $(kubectl get secrets | grep -q 'dbhost'); then
    # do this if not already set
    echo "Setting DB Host.."
    kubectl create secret generic dbhost --from-literal DB_HOST=${BASH_REMATCH[1]}
  fi
fi

if ! $(kubectl get secrets | grep -q 'dbpassword'); then
  # do this if not already set
  echo "Setting secret.."
  kubectl create secret generic dbpassword --from-literal DB_PASSWORD=$RDS_MASTER_PASSWORD
fi

echo "Applying K8s config..."

kubectl apply -f k8s
# kubectl set image deployments/api-deployment api=onxssis/v1commerce_api:$SHA
# kubectl set image deployments/client-deployment client=onxssis/v1commerce_client:$SHA

echo "Applying Ingress config..."

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/aws/deploy.yaml
