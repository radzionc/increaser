import { assertUserId } from '../../auth/assertUserId'
import * as visionDb from '@increaser/db/vision'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { deletePublicBucketFile } from '@increaser/public/deletePublicBucketFile'
import { getPublicBucketUserFileKey } from '@increaser/public/getPublicBucketUserFileKey'

export const deleteVisionAttribute: ApiResolver<
  'deleteVisionAttribute'
> = async ({ input: { id }, context }) => {
  const userId = assertUserId(context)

  const visionAttribute = await visionDb.getVisionAttribute(userId, id)

  await visionDb.deleteVisionAttribute(userId, id)

  if (visionAttribute.imageId) {
    await deletePublicBucketFile(
      getPublicBucketUserFileKey(userId, visionAttribute.imageId),
    )
  }
}
