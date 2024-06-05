export const getPublicBucketUserFileKey = (userId: string, fileId: string) =>
  `users/${userId}/${fileId}`
