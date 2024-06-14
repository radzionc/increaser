import { getId } from '@increaser/entities-utils/shared/getId'
import { getPublicBucketUserFileKey } from './getPublicBucketUserFileKey'
import { CopyObjectCommand } from '@aws-sdk/client-s3'
import { getPublicBucketName } from './getPublicBucketName'
import { getS3Client } from './getS3Client'

type Input = {
  srcFileId: string
  userId: string
}

export const copyToUserFolder = async ({ srcFileId, userId }: Input) => {
  const fileId = getPublicBucketUserFileKey(userId, getId())

  const s3Client = getS3Client()
  const bucketName = getPublicBucketName()

  const copyCommand = new CopyObjectCommand({
    Bucket: bucketName,
    CopySource: `${bucketName}/${srcFileId}`,
    Key: fileId,
    CacheControl: 'max-age=31536000, public',
  })

  await s3Client.send(copyCommand)

  return fileId
}
