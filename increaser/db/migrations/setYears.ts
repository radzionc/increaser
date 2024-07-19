import { getAllUsers, updateUser } from '../user'

const setYears = async () => {
  const users = await getAllUsers(['id'])

  await Promise.all(users.map(({ id }) => updateUser(id, { years: {} })))
}

setYears()
