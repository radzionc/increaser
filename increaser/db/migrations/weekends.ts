import { getAllUsers, updateUser } from '../user'
import { defaultWeekends } from '@increaser/entities/User'

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
