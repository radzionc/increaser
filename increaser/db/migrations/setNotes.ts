import { getAllUsers, updateUser } from '../user'

const setNotes = async () => {
  const users = await getAllUsers(['id'])

  await Promise.all(users.map(({ id }) => updateUser(id, { notes: {} })))
}

setNotes()
