import { CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getEnvVar } from './getEnvVar'
import { getS3Client } from './getS3Client'

export const movePublicBucketFile = async (
  sourceKey: string,
  destinationKey: string,
): Promise<void> => {
  const s3Client = getS3Client()
  const bucketName = getEnvVar('PUBLIC_BUCKET_NAME')

  // Copy the object to the new location
  const copyCommand = new CopyObjectCommand({
    Bucket: bucketName,
    CopySource: `${bucketName}/${sourceKey}`,
    Key: destinationKey,
  })

  await s3Client.send(copyCommand)

  // Delete the original object
  const deleteCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: sourceKey,
  })

  await s3Client.send(deleteCommand)
}
