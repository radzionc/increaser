import { assertUserId } from '../../auth/assertUserId'
import * as visionDb from '@increaser/db/vision'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const deleteVisionAttribute: ApiResolver<
  'deleteVisionAttribute'
> = async ({ input: { id }, context }) => {
  const userId = assertUserId(context)

  await visionDb.deleteVisionAttribute(userId, id)
}
