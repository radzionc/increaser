import { attempt } from '@lib/utils/attempt'
import { recordFromItems } from '@lib/utils/record/recordFromItems'
import { deleteUser } from '@product/data-services/users/deleteUser'
import { getUser, putUser } from '@product/db/user'
import { copyToUserFolder } from '@product/public/copyToUserFolder'

import { demoConfig } from '../config'
import { getDemoUser } from '../getDemoUser'

export const createDemoUser = async () => {
  const { data: existingUser } = await attempt(() =>
    getUser(demoConfig.userId, ['id']),
  )

  if (existingUser) {
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

  user.vision = recordFromItems(visionAttributes, (va) => va.id)

  await putUser(user)
}

createDemoUser()
