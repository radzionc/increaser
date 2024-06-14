import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getId } from '@increaser/entities-utils/shared/getId'
import { getS3Client } from '@increaser/public/getS3Client'
import { getPublicBucketName } from '@increaser/public/getPublicBucketName'

export const getFileUploadUrl: ApiResolver<'getFileUploadUrl'> = async ({
  input: { contentType },
  context,
}) => {
  assertUserId(context)

  const s3Client = getS3Client()

  const key = `temp/${getId()}`

  const command = new PutObjectCommand({
    Bucket: getPublicBucketName(),
    Key: key,
    ContentType: contentType,
    CacheControl: 'max-age=31536000, public',
  })

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 })

  return { url, key }
}
