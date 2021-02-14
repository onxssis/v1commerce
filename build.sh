echo "Configuring shell to connect to EKS cluster..."
aws eks --region $AWS_REGION update-kubeconfig --name v1commerce

kubectl get svc

echo "Building Docker images..."
docker build -t onxssis/v1commerce_client:latest -t onxssis/v1commerce_client:$SHA -f ./client/Dockerfile ./client
docker build -t onxssis/v1commerce_api:latest -t onxssis/v1commerce_api:$SHA -f ./api/Dockerfile ./api

echo "Pushing Docker images..."

docker push onxssis/v1commerce_client:latest
docker push onxssis/v1commerce_api:latest

docker push onxssis/v1commerce_client:$SHA
docker push onxssis/v1commerce_api:$SHA

echo "Applying K8s config..."

kubectl apply -f k8s
kubectl set image deployments/api-deployment api=onxssis/v1commerce_api:$SHA
kubectl set image deployments/client-deployment client=onxssis/v1commerce_client:$SHA

echo "Applying Ingress config..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/aws/deploy.yaml
