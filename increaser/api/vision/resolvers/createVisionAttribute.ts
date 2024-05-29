import { assertUserId } from '../../auth/assertUserId'
import * as visionDb from '@increaser/db/vision'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { VisionAttribute } from '@increaser/entities/Vision'

export const createVisionAttribute: ApiResolver<
  'createVisionAttribute'
> = async ({ input, context }): Promise<VisionAttribute> => {
  const userId = assertUserId(context)

  await visionDb.putVisionAttribute(userId, {
    ...input,
    order: input.order ?? 0,
  })

  return input
}
