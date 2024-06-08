import { assertUserId } from '../../auth/assertUserId'
import * as visionDb from '@increaser/db/vision'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { deletePublicBucketFile } from '@increaser/public/deletePublicBucketFile'
import { getPublicBucketUserFileKey } from '@increaser/public/getPublicBucketUserFileKey'
import { getId } from '@increaser/entities-utils/shared/getId'
import { copyPublicBucketFile } from '@increaser/public/copyPublicBucketFile'

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
      const newImageId = getPublicBucketUserFileKey(userId, getId())
      await copyPublicBucketFile(fields.imageId, newImageId)
      fields.imageId = newImageId
    }
  }

  return visionDb.updateVisionAttribute(userId, id, fields)
}
