import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getS3Client } from './getS3Client'
import { getPublicBucketName } from './getPublicBucketName'

export const deletePublicBucketFile = async (key: string): Promise<void> => {
  const s3Client = getS3Client()
  const bucketName = getPublicBucketName()

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  })

  await s3Client.send(command)
}
