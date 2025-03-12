import { recordMap } from '@lib/utils/record/recordMap'
import { syncHabitsDependantFields } from '@product/data-services/habits/syncHabitsDependantFields'
import { syncPrinciplesDependantFields } from '@product/data-services/principles/syncPrinciplesDependantFields'
import { syncProjectsDependantFields } from '@product/data-services/projects/syncProjectsDependantFields'
import { syncTaskFactoriesDependantFields } from '@product/data-services/taskFactories/syncTaskFactoriesDependantFields'
import { syncVisionDependantFields } from '@product/data-services/vision/syncVisionDependantFields'
import { getUser, updateUser } from '@product/db/user'
import * as userEntitiesDb from '@product/db/userEntity'
import { otherPrincipleCategoryId } from '@product/entities/PrincipleCategory'
import { UserEntity, UserEntityType } from '@product/entities/User'
import { deletePublicBucketFile } from '@product/public/deletePublicBucketFile'
import { getPublicBucketUserFileKey } from '@product/public/getPublicBucketUserFileKey'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'

type UserEntityRemovalHandlerParams<T extends UserEntity> = {
  userId: string
  value: UserEntityType[T]
}

const handleUserEntityRemoval: Partial<{
  [K in UserEntity]: (
    params: UserEntityRemovalHandlerParams<K>,
  ) => Promise<void>
}> = {
  project: ({ userId }) => syncProjectsDependantFields(userId),
  taskFactory: ({ userId }) => syncTaskFactoriesDependantFields(userId),
  habit: ({ userId }) => syncHabitsDependantFields(userId),
  visionAttribute: async ({ userId, value: { imageId } }) => {
    if (imageId) {
      await deletePublicBucketFile(getPublicBucketUserFileKey(userId, imageId))
    }
  },
  principleCategory: async ({ userId, value: { id } }) => {
    const { principles } = await getUser(userId, ['principles'])

    await updateUser(userId, {
      principles: recordMap(principles, (principle) =>
        principle.categoryId === id
          ? { ...principle, categoryId: otherPrincipleCategoryId }
          : principle,
      ),
    })

    await syncVisionDependantFields(userId)
  },
  principle: async ({ userId }) => syncPrinciplesDependantFields(userId),
}

export const deleteUserEntity: ApiResolver<'deleteUserEntity'> = async ({
  input: { entity, id },
  context,
}) => {
  const userId = assertUserId(context)

  const value = await userEntitiesDb.getUserEntity({
    userId,
    entity,
    entityId: id,
  })

  await userEntitiesDb.deleteUserEntity({
    userId,
    entity,
    entityId: id,
  })

  const handler = handleUserEntityRemoval[entity]
  await handler?.({ userId, value: value as never })
}
