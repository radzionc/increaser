import { getUser, putUser } from '@increaser/db/user'
import { demoConfig } from '../config'
import { getDemoUser } from '../getDemoUser'
import { deleteUser } from '@increaser/data-services/users/deleteUser'
import { getPublicBucketUserFileKey } from '@increaser/public/getPublicBucketUserFileKey'
import { getId } from '@increaser/entities-utils/shared/getId'
import { copyPublicBucketFile } from '@increaser/public/copyPublicBucketFile'
import { getRecord } from '@lib/utils/record/getRecord'

export const createDemoUser = async () => {
  if (await getUser(demoConfig.userId, ['id'])) {
    await deleteUser(demoConfig.userId)
  }

  const user = getDemoUser()
  const visionAttributes = await Promise.all(
    Object.values(user.vision).map(async (va) => {
      if (!va.imageId) return va

      const imageId = getPublicBucketUserFileKey(user.id, getId())
      await copyPublicBucketFile(va.imageId, imageId)

      return {
        ...va,
        imageId,
      }
    }),
  )

  user.vision = getRecord(visionAttributes, (va) => va.id)

  await putUser(user)
}

createDemoUser()
