import { recordMap } from '@lib/utils/record/recordMap'
import { getAllUsers, updateUser } from '../user'
import { dayToString, toDay } from '@lib/utils/time/Day'
import { addYears } from 'date-fns'
;(async () => {
  const users = await getAllUsers(['id', 'goals'])

  await Promise.all(
    users.map(({ id, goals }) =>
      updateUser(id, {
        goals: recordMap(goals, (goal) => ({
          ...goal,
          deadlineAt:
            goal.deadlineAt ??
            dayToString(toDay(addYears(Date.now(), 1).getTime())),
        })),
      }),
    ),
  )
})()
