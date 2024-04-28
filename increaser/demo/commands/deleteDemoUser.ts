import { deleteUser, getUser } from '@increaser/db/user'
import { demoConfig } from '../config'

const deleteDemoUser = async () => {
  const user = await getUser(demoConfig.userId, ['id'])
  if (user) {
    await deleteUser(user.id)
    console.log('User deleted')
  }
}

deleteDemoUser()
