import { ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3'

import { getPublicBucketName } from './getPublicBucketName'
import { getS3Client } from './getS3Client'

export const deletePublicBucketFolder = async (
  folderKey: string,
): Promise<void> => {
  const s3Client = getS3Client()
  const bucketName = getPublicBucketName()

  // List objects in the folder
  const listCommand = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: folderKey,
  })

  const listedObjects = await s3Client.send(listCommand)

  if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
    return
  }

  // Create an array of objects to delete
  const objectsToDelete = listedObjects.Contents.map(({ Key }) => ({ Key }))

  const deleteCommand = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: {
      Objects: objectsToDelete,
      Quiet: true, // Set to true if you don't want the response to include information about each object deleted
    },
  })

  await s3Client.send(deleteCommand)
  console.log(`Deleted all objects in the folder: ${folderKey}`)
}
