echo "Creating CloudFormation Stack..."

aws cloudformation deploy --template-file cloudformation.yaml --capabilities CAPABILITY_NAMED_IAM --stack-name v1commerce-eks-stack --paramaters ParameterKey=RDSMasterPassword,ParameterValue=
