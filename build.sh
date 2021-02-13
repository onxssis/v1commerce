aws eks --region $AWS_REGION update-kubeconfig --name v1commerce

kubectl get svc

docker build -t onxssis/v1commerce_client:latest -t onxssis/v1commerce_client:$SHA -f ./client/Dockerfile ./client
docker build -t onxssis/v1commerce_api:latest -t onxssis/v1commerce_api:$SHA -f ./api/Dockerfile ./api

docker push onxssis/v1commerce_client:latest
docker push onxssis/v1commerce_api:latest

docker push onxssis/v1commerce_client:$SHA
docker push onxssis/v1commerce_api:$SHA

kubectl apply -f k8s
kubectl set image deployments/api-deployment api=onxssis/v1commerce_api:$SHA
kubectl set image deployments/client-deployment client=onxssis/v1commerce_client:$SHA
