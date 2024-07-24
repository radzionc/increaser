import { assertUserId } from '../../auth/assertUserId'
import * as userEntitiesDb from '@increaser/db/userEntity'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const createUserEntity: ApiResolver<'createUserEntity'> = async ({
  input: { value, entity },
  context,
}) => {
  const userId = assertUserId(context)

  await userEntitiesDb.putUserEntity({
    userId,
    entity,
    value,
  })

  return value
}
