import { convertDuration } from '@lib/utils/time/convertDuration'
import { notifyInactiveAccountAfter } from '@product/config'

import { getAllUsers, updateUser } from '../user'
;(async () => {
  const users = await getAllUsers([
    'id',
    'lifeTimeDeal',
    'freeTrialEnd',
    'subscription',
    'projects',
    'weeks',
  ])

  const inactiveUsers = users.filter((user) => {
    if (user.lifeTimeDeal || user.subscription) return false

    if (
      user.freeTrialEnd >
      Date.now() - convertDuration(notifyInactiveAccountAfter, 'd', 'ms')
    ) {
      return false
    }

    if (Object.keys(user.projects).length > 1) return false

    if (Object.keys(user.weeks).length > 1) return false

    return true
  })

  await Promise.all(
    inactiveUsers.map(({ id, freeTrialEnd }) => {
      updateUser(id, {
        lastVisitAt: freeTrialEnd,
      })
    }),
  )
})()
