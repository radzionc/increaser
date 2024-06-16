import { assertUserId } from '../../auth/assertUserId'
import * as visionDb from '@increaser/db/vision'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { deletePublicBucketFile } from '@increaser/public/deletePublicBucketFile'
import { getPublicBucketUserFileKey } from '@increaser/public/getPublicBucketUserFileKey'
import { copyToUserFolder } from '@increaser/public/copyToUserFolder'

export const updateVisionAttribute: ApiResolver<
  'updateVisionAttribute'
> = async ({ input, context }) => {
  const userId = assertUserId(context)

  const oldVisionAttribute = await visionDb.getVisionAttribute(userId, input.id)

  const { id, fields } = input

  if (
    fields.imageId !== undefined &&
    oldVisionAttribute.imageId !== fields.imageId
  ) {
    if (oldVisionAttribute.imageId) {
      await deletePublicBucketFile(
        getPublicBucketUserFileKey(userId, oldVisionAttribute.imageId),
      )
    }

    if (fields.imageId) {
      fields.imageId = await copyToUserFolder({
        srcFileId: fields.imageId,
        userId,
      })
    }
  }

  return visionDb.updateVisionAttribute(userId, id, fields)
}
