import { assertUserId } from '../../auth/assertUserId'
import * as userEntitiesDb from '@increaser/db/userEntity'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { UserEntity } from '@increaser/entities/User'
import { syncProjectsDependantFields } from '@increaser/data-services/projects/syncProjectsDependantFields'

type UserEntityRemovalHandlerParams = {
  userId: string
  id: string
}

const handleUserEntityRemoval: Partial<
  Record<UserEntity, (params: UserEntityRemovalHandlerParams) => Promise<void>>
> = {
  project: ({ userId }) => syncProjectsDependantFields(userId),
}

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

  const handler = handleUserEntityRemoval[entity]
  await handler?.({ userId, id })
}
