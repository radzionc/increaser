import { getAllUsers, updateUser } from '../user'
;(async () => {
  const users = await getAllUsers(['id', 'projects', 'weeks'])

  const inactiveUsers = users.filter((user) => {
    if (Object.keys(user.projects).length > 1) return false

    if (Object.keys(user.weeks).length > 1) return false

    return true
  })

  await Promise.all(
    inactiveUsers.map(({ id }) => {
      updateUser(id, {
        lastVisitAt: Date.now(),
      })
    }),
  )
})()
