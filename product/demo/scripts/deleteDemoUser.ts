import { deleteUser } from '@product/data-services/users/deleteUser'
import { getUser } from '@product/db/user'

import { demoConfig } from '../config'

const deleteDemoUser = async () => {
  const user = await getUser(demoConfig.userId, ['id'])
  if (user) {
    await deleteUser(user.id)
  }
}

deleteDemoUser()
