import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getEnvVar } from './getEnvVar'
import { getS3Client } from './getS3Client'

export const deletePublicBucketFile = async (key: string): Promise<void> => {
  const s3Client = getS3Client()
  const bucketName = getEnvVar('PUBLIC_BUCKET_NAME')

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  })

  await s3Client.send(command)
}
