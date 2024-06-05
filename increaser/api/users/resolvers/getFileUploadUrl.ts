import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getEnvVar } from '../../getEnvVar'
import { getId } from '@increaser/entities-utils/shared/getId'
import { getS3Client } from '../../../public/getS3Client'

export const getFileUploadUrl: ApiResolver<'getFileUploadUrl'> = async ({
  input: { contentType },
  context,
}) => {
  assertUserId(context)

  const s3Client = getS3Client()

  const key = `temp/${getId()}`

  const command = new PutObjectCommand({
    Bucket: getEnvVar('PUBLIC_BUCKET_NAME'),
    Key: `temp/${getId()}`,
    ContentType: contentType,
  })

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 })

  return { url, key }
}
