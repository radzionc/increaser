import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getS3Client } from './getS3Client'
import { getPublicBucketName } from './getPublicBucketName'
import { copyPublicBucketFile } from './copyPublicBucketFile'

export const movePublicBucketFile = async (
  sourceKey: string,
  destinationKey: string,
): Promise<void> => {
  const s3Client = getS3Client()
  const bucketName = getPublicBucketName()

  copyPublicBucketFile(sourceKey, destinationKey)

  // Delete the original object
  const deleteCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: sourceKey,
  })

  await s3Client.send(deleteCommand)
}
