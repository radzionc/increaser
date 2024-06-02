import { getAllUsers, updateUser } from '../user'

const setGoals = async () => {
  const users = await getAllUsers(['id'])

  await Promise.all(users.map(({ id }) => updateUser(id, { goals: {} })))
}

setGoals()
