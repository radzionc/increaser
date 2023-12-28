yarn build
cd dist

BUCKET=tf-scoreboard-storage
BUCKET_KEY=lambda.zip

zip -r ./$BUCKET_KEY *

aws s3 cp $BUCKET_KEY s3://$BUCKET/$BUCKET_KEY
aws lambda update-function-code --function-name tf-scoreboard --s3-bucket $BUCKET --s3-key $BUCKET_KEY

cd ..