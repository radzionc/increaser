import { getUser } from '@increaser/db/user'
import { demoConfig } from '../config'
import { deleteUser } from '@increaser/data-services/users/deleteUser'

const deleteDemoUser = async () => {
  const user = await getUser(demoConfig.userId, ['id'])
  if (user) {
    await deleteUser(user.id)
  }
}

deleteDemoUser()
