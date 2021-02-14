echo "Waiting for CloudFormation Stack to Create/Update..."

started_date=$(date '+%H:%M:%S')
start=$(date +%s)
while true; do
  if [[ $(aws cloudformation describe-stacks --region $AWS_REGION --stack-name v1commerce-eks-stack --query "Stacks[*].StackStatus" --output text) == *"PROGRESS"* ]]; then
    echo -e "EKS Cluster status : $(aws cloudformation describe-stacks --region $AWS_REGION --stack-name v1commerce-eks-stack --query "Stacks[*].StackStatus" --output text) \n"
    sleep 10
  elif [[ $(aws cloudformation describe-stacks --region $AWS_REGION --stack-name v1commerce-eks-stack --query "Stacks[*].StackStatus" --output text) == *"COMPLETE"* ]]; then
    echo -e "EKS Cluster status : $(aws cloudformation describe-stacks --region $AWS_REGION --stack-name v1commerce-eks-stack --query "Stacks[*].StackStatus" --output text) \n"
    end=$(date +%s)
    runtime=$((end - start))
    finished_date=$(date '+%H:%M:%S')
    echo "started at :" $started_date
    echo "finished at :" $finished_date
    hours=$((runtime / 3600))
    minutes=$(((runtime % 3600) / 60))
    seconds=$(((runtime % 3600) % 60))
    echo "Total time : $hours h $minutes min $seconds sec"
    break
  else
    echo -e "EKS Cluster status : $(aws cloudformation describe-stacks --region $AWS_REGION --stack-name v1commerce-eks-stack --query "Stacks[*].StackStatus" --output text) \n"
    break
  fi
done
