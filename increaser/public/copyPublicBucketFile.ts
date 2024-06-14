import { CopyObjectCommand } from '@aws-sdk/client-s3'
import { getS3Client } from './getS3Client'
import { getPublicBucketName } from './getPublicBucketName'

export const copyPublicBucketFile = async (
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
    MetadataDirective: 'COPY',
  })

  await s3Client.send(copyCommand)
}
