import { getEnvVar } from './getEnvVar'

export const getPublicBucketName = () => getEnvVar('PUBLIC_BUCKET_NAME')
