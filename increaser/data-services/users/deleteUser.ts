import * as userDb from '@increaser/db/user'
import { deletePublicBucketFolder } from '@increaser/public/deletePublicBucketFolder'
import { getPublicBucketUserFolder } from '@increaser/public/getPublickBucketUserFolder'

export const deleteUser = async (id: string) => {
  console.log(`Deleting user with id: ${id}`)
  await userDb.deleteUser(id)
  await deletePublicBucketFolder(getPublicBucketUserFolder(id))
}
