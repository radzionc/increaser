import { assertUserId } from '../../auth/assertUserId'
import * as userEntitiesDb from '@increaser/db/userEntity'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { UserEntity, UserEntityType } from '@increaser/entities/User'
import { deletePublicBucketFile } from '@increaser/public/deletePublicBucketFile'
import { getPublicBucketUserFileKey } from '@increaser/public/getPublicBucketUserFileKey'
import { copyToUserFolder } from '@increaser/public/copyToUserFolder'

type ProcessFieldsParams<T extends UserEntity> = {
  userId: string
  id: string
  fields: Partial<UserEntityType[T]>
}

const processFields: Partial<{
  [K in UserEntity]: (
    params: ProcessFieldsParams<K>,
  ) => Promise<Partial<UserEntityType[K]>>
}> = {
  visionAttribute: async ({ userId, fields, id }) => {
    const oldVisionAttribute = await userEntitiesDb.getUserEntity({
      userId,
      entityId: id,
      entity: 'visionAttribute',
    })
    const result = { ...fields }
    if (
      fields.imageId !== undefined &&
      oldVisionAttribute.imageId !== fields.imageId
    ) {
      if (oldVisionAttribute.imageId) {
        await deletePublicBucketFile(
          getPublicBucketUserFileKey(userId, oldVisionAttribute.imageId),
        )
      }

      if (fields.imageId) {
        result.imageId = await copyToUserFolder({
          srcFileId: fields.imageId,
          userId,
        })
      }
    }

    return result
  },
}

export const updateUserEntity: ApiResolver<'updateUserEntity'> = async ({
  input: { id, fields: rawFields, entity },
  context,
}) => {
  const userId = assertUserId(context)

  const process = processFields[entity]
  const fields = process
    ? await process({ userId, id, fields: rawFields as never })
    : rawFields

  const value = userEntitiesDb.updateUserEntity({
    userId,
    entity,
    entityId: id,
    fields,
  })

  return value
}
