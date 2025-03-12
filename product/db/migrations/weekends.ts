import { defaultWeekends } from '@product/entities/User'

import { getAllUsers, updateUser } from '../user'

const weekends = async () => {
  const users = await getAllUsers(['id'])

  await Promise.all(
    users.map((user) => {
      return updateUser(user.id, {
        weekends: defaultWeekends,
      })
    }),
  )
}

weekends()
