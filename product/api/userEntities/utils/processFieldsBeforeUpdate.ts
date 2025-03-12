import * as userEntitiesDb from '@product/db/userEntity'
import { UserEntity, UserEntityType } from '@product/entities/User'
import { copyToUserFolder } from '@product/public/copyToUserFolder'
import { deletePublicBucketFile } from '@product/public/deletePublicBucketFile'
import { getPublicBucketUserFileKey } from '@product/public/getPublicBucketUserFileKey'

type ProcessFieldsParams<T extends UserEntity> = {
  userId: string
  id: string
  fields: Partial<UserEntityType[T]>
}

export const processFieldsBeforeUpdate: Partial<{
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
