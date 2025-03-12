import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getId } from '@product/entities-utils/shared/getId'
import { getPublicBucketName } from '@product/public/getPublicBucketName'
import { getS3Client } from '@product/public/getS3Client'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'

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
