import { getAllUsers, updateUser } from '../user'
;(async () => {
  const users = await getAllUsers(['id'])

  await Promise.all(
    users.map(({ id }) =>
      updateUser(id, {
        taskTemplates: {},
      }),
    ),
  )
})()
