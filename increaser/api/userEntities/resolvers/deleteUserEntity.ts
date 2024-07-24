import { assertUserId } from '../../auth/assertUserId'
import * as userEntitiesDb from '@increaser/db/userEntity'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const deleteUserEntity: ApiResolver<'deleteUserEntity'> = async ({
  input: { entity, id },
  context,
}) => {
  const userId = assertUserId(context)

  await userEntitiesDb.deleteUserEntity({
    userId,
    entity,
    entityId: id,
  })
}
