import { assertUserId } from '../../auth/assertUserId'
import * as visionDb from '@increaser/db/vision'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateVisionAttribute: ApiResolver<
  'updateVisionAttribute'
> = async ({ input, context }) => {
  const userId = assertUserId(context)

  const { id, fields } = input

  const value = visionDb.updateVisionAttribute(userId, id, fields)

  return value
}
