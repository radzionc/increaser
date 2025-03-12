import { getPublicBucketUserFolder } from './getPublickBucketUserFolder'

export const getPublicBucketUserFileKey = (userId: string, fileId: string) =>
  `${getPublicBucketUserFolder(userId)}/${fileId}`
