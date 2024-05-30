import { getAllUsers, updateUser } from '../user'

const setVision = async () => {
  const users = await getAllUsers(['id'])

  await Promise.all(users.map(({ id }) => updateUser(id, { vision: {} })))
}

setVision()
