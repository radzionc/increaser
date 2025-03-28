yarn build
cd dist

BUCKET=tf-accounts-cleaner-storage
BUCKET_KEY=lambda.zip
FUNCTION_NAME=tf-accounts-cleaner

zip -r ./$BUCKET_KEY *

aws s3 cp $BUCKET_KEY s3://$BUCKET/$BUCKET_KEY
aws lambda update-function-code --function-name $FUNCTION_NAME --s3-bucket $BUCKET --s3-key $BUCKET_KEY

cd ..