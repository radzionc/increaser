import { getUser, putUser } from '@increaser/db/user'
import { demoConfig } from '../config'
import { deleteUser } from '@increaser/data-services/users/deleteUser'
import { asyncAttempt } from '@lib/utils/asyncAttempt'
import { getUserInitialFields } from '@increaser/entities-utils/user/getUserInitialFields'
import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'

export const createDemoUser = async () => {
  if (await asyncAttempt(() => getUser(demoConfig.userId, ['id']), undefined)) {
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
