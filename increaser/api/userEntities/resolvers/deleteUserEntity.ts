import { assertUserId } from '../../auth/assertUserId'
import * as userEntitiesDb from '@increaser/db/userEntity'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { UserEntity, UserEntityType } from '@increaser/entities/User'
import { syncProjectsDependantFields } from '@increaser/data-services/projects/syncProjectsDependantFields'
import { syncTaskFactoriesDependantFields } from '@increaser/data-services/taskFactories/syncTaskFactoriesDependantFields'
import { deletePublicBucketFile } from '@increaser/public/deletePublicBucketFile'
import { getPublicBucketUserFileKey } from '@increaser/public/getPublicBucketUserFileKey'
import { getUser, updateUser } from '@increaser/db/user'
import { recordMap } from '@lib/utils/record/recordMap'
import { otherPrincipleCategoryId } from '@increaser/entities/PrincipleCategory'
import { syncHabitsDependantFields } from '@increaser/data-services/habits/syncHabitsDependantFields'
import { syncPrinciplesDependantFields } from '@increaser/data-services/principles/syncPrinciplesDependantFields'
import { syncVisionDependantFields } from '@increaser/data-services/vision/syncVisionDependantFields'

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
