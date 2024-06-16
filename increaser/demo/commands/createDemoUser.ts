import { getUser, putUser } from '@increaser/db/user'
import { demoConfig } from '../config'
import { getDemoUser } from '../getDemoUser'
import { deleteUser } from '@increaser/data-services/users/deleteUser'
import { getRecord } from '@lib/utils/record/getRecord'
import { copyToUserFolder } from '@increaser/public/copyToUserFolder'

export const createDemoUser = async () => {
  if (await getUser(demoConfig.userId, ['id'])) {
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

  user.vision = getRecord(visionAttributes, (va) => va.id)

  await putUser(user)
}

createDemoUser()
