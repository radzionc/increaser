. ./set_env_vars.sh

yarn build
cd dist

BUCKET=tf-paddle-classic-webhooks-storage
BUCKET_KEY=lambda.zip

zip -r ./$BUCKET_KEY *

aws s3 cp $BUCKET_KEY s3://$BUCKET/$BUCKET_KEY
aws lambda update-function-code --function-name tf-paddle-classic-webhooks --s3-bucket $BUCKET --s3-key $BUCKET_KEY

cd ..
