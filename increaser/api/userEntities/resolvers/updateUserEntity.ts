import { assertUserId } from '../../auth/assertUserId'
import * as userEntitiesDb from '@increaser/db/userEntity'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateUserEntity: ApiResolver<'updateUserEntity'> = async ({
  input: { id, fields, entity },
  context,
}) => {
  const userId = assertUserId(context)

  const value = userEntitiesDb.updateUserEntity({
    userId,
    entity,
    entityId: id,
    fields,
  })

  return value
}
