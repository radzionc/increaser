import { getAllUsers, updateUser } from '../user'
;(async () => {
  const users = (await getAllUsers(['id', 'completedEducation'])).filter(
    (user) => !user.completedEducation,
  )

  await Promise.all(
    users.map(({ id }) => updateUser(id, { completedEducation: [] })),
  )
})()
