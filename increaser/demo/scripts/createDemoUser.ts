import { getUser, putUser } from '@increaser/db/user'
import { demoConfig } from '../config'
import { getDemoUser } from '../getDemoUser'
import { deleteUser } from '@increaser/data-services/users/deleteUser'
import { toRecord } from '@lib/utils/record/toRecord'
import { copyToUserFolder } from '@increaser/public/copyToUserFolder'
import { asyncAttempt } from '@lib/utils/asyncAttempt'

export const createDemoUser = async () => {
  if (await asyncAttempt(() => getUser(demoConfig.userId, ['id']), undefined)) {
    await deleteUser(demoConfig.userId)
  }

  const user = getDemoUser()
  const visionAttributes = await Promise.all(
    Object.values(user.vision).map(async (va) => {
      if (!va.imageId) return va

      const imageId = await copyToUserFolder({
        srcFileId: va.imageId,
        userId: demoConfig.userId,
      })

      return {
        ...va,
        imageId,
      }
    }),
  )

  user.vision = toRecord(visionAttributes, (va) => va.id)

  await putUser(user)
}

createDemoUser()
