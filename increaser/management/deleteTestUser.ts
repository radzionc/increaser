import { getUserByEmail, deleteUser } from '@increaser/db/user'

const deleteTestUser = async (email: string) => {
  const user = await getUserByEmail(email, ['id'])
  if (user) {
    await deleteUser(user.id)
    console.log('User deleted')
  }
}

const email = 'rodionaaafgh@gmail.com'
deleteTestUser(email)
