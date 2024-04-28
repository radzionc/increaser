import { deleteUser, putUser } from '@increaser/db/user'
import { demoConfig } from '../config'
import { getDemoUser } from '../getDemoUser'
import { asyncAttempt } from '@lib/utils/asyncAttempt'

export const createDemoUser = async () => {
  await asyncAttempt(() => deleteUser(demoConfig.userId), undefined)
  await putUser(getDemoUser())
}

createDemoUser()
