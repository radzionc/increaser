import { recordMap } from '@lib/utils/record/recordMap'
import { getAllUsers, updateUser } from '../user'
import { dayToString, toDay } from '@lib/utils/time/Day'
;(async () => {
  const users = await getAllUsers(['id', 'goals'])

  await Promise.all(
    users.map(({ id, goals }) =>
      updateUser(id, {
        goals: recordMap(goals, (goal) => ({
          ...goal,
          deadlineAt: goal.deadlineAt
            ? dayToString(toDay(goal.deadlineAt as unknown as number))
            : null,
        })),
      }),
    ),
  )
})()
