import * as userEntitiesDb from '@product/db/userEntity'
import { UserEntity, UserEntityType } from '@product/entities/User'
import { copyToUserFolder } from '@product/public/copyToUserFolder'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'

type ProcessValueParams<T extends UserEntity> = {
  userId: string
  value: UserEntityType[T]
}

const processValue: Partial<{
  [K in UserEntity]: (
    params: ProcessValueParams<K>,
  ) => Promise<UserEntityType[K]>
}> = {
  visionAttribute: async ({ userId, value }) => {
    const result = { ...value }
    if (result.imageId) {
      result.imageId = await copyToUserFolder({
        srcFileId: result.imageId,
        userId,
      })
    }

    return result
  },
}

export const createUserEntity: ApiResolver<'createUserEntity'> = async ({
  input: { value: rawValue, entity },
  context,
}) => {
  const userId = assertUserId(context)

  const process = processValue[entity]
  const value = process
    ? await process({ userId, value: rawValue as never })
    : rawValue

  await userEntitiesDb.putUserEntity({
    userId,
    entity,
    value,
  })

  return value
}
