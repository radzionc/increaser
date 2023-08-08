import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront'

interface UploadJsonToPublicParams<T> {
  content: T
  path: string
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
})

const cloudfrontClient = new CloudFrontClient({
  region: process.env.AWS_REGION,
})

export const uploadJsonToPublic = async <T>({
  content,
  path,
}: UploadJsonToPublicParams<T>) => {
  const objectKey = `${path}.json`

  const putCommand = new PutObjectCommand({
    Bucket: process.env.PUBLIC_BUCKET_NAME,
    Key: objectKey,
    Body: JSON.stringify(content),
    ContentType: 'application/json',
  })

  await s3Client.send(putCommand)

  const invalidationItems = [`/${objectKey}`]

  const invalidateCommand = new CreateInvalidationCommand({
    DistributionId: process.env.PUBLIC_DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: invalidationItems.length,
        Items: invalidationItems,
      },
    },
  })

  await cloudfrontClient.send(invalidateCommand)
}
