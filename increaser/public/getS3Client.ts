import { memoize } from '@lib/utils/memoize'
import { S3Client } from '@aws-sdk/client-s3'
import { getEnvVar } from './getEnvVar'

export const getS3Client = memoize(() => {
  return new S3Client({
    region: getEnvVar('PUBLIC_BUCKET_REGION'),
  })
})
