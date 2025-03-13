import { attempt } from '@lib/utils/attempt'
import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { deleteUser } from '@product/data-services/users/deleteUser'
import { getUser, putUser } from '@product/db/user'
import { getUserInitialFields } from '@product/entities-utils/user/getUserInitialFields'

import { demoConfig } from '../config'

export const createDemoUser = async () => {
  const { data: existingUser } = await attempt(() =>
    getUser(demoConfig.userId, ['id']),
  )

  if (existingUser) {
    await deleteUser(demoConfig.userId)
  }

  const user = getUserInitialFields({
    email: demoConfig.userEmail,
    timeZone: getCurrentTimezoneOffset(),
  })
  user.id = demoConfig.userId

  await putUser(user)
}

createDemoUser()
