import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

interface UploadJsonToPublicParams<T> {
  content: T
  path: string
}

const s3Client = new S3Client({
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
    CacheControl: 'max-age=600',
  })

  await s3Client.send(putCommand)
}
