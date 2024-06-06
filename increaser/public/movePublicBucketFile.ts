import { CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getS3Client } from './getS3Client'
import { getPublicBucketName } from './getPublicBucketName'

export const movePublicBucketFile = async (
  sourceKey: string,
  destinationKey: string,
): Promise<void> => {
  const s3Client = getS3Client()
  const bucketName = getPublicBucketName()

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
