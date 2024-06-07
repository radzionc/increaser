import { getAllUsers, updateUser } from '../user'

const setLastVisitAt = async () => {
  const users = await getAllUsers(['id'])

  await Promise.all(
    users.map(({ id }) => updateUser(id, { lastVisitAt: Date.now() })),
  )
}

setLastVisitAt()
