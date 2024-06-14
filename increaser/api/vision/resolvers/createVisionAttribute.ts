import { assertUserId } from '../../auth/assertUserId'
import * as visionDb from '@increaser/db/vision'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { VisionAttribute } from '@increaser/entities/Vision'
import { copyToUserFolder } from '@increaser/public/copyToUserFolder'

export const createVisionAttribute: ApiResolver<
  'createVisionAttribute'
> = async ({ input, context }): Promise<VisionAttribute> => {
  const userId = assertUserId(context)

  if (input.imageId) {
    input.imageId = await copyToUserFolder({
      srcFileId: input.imageId,
      userId,
    })
  }

  await visionDb.putVisionAttribute(userId, {
    ...input,
    order: input.order ?? 0,
  })

  return input
}
