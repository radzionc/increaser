import { assertUserId } from '../../auth/assertUserId'
import * as visionDb from '@increaser/db/vision'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { VisionAttribute } from '@increaser/entities/Vision'
import { getPublicBucketUserFileKey } from '@increaser/public/getPublicBucketUserFileKey'
import { movePublicBucketFile } from '@increaser/public/movePublicBucketFile'

export const createVisionAttribute: ApiResolver<
  'createVisionAttribute'
> = async ({ input, context }): Promise<VisionAttribute> => {
  const userId = assertUserId(context)

  if (input.imageId) {
    const newImageId = getPublicBucketUserFileKey(userId, input.imageId)
    await movePublicBucketFile(input.imageId, newImageId)
    input.imageId = newImageId
  }

  await visionDb.putVisionAttribute(userId, {
    ...input,
    order: input.order ?? 0,
  })

  return input
}
