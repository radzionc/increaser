import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { recordMap } from '@lib/utils/record/recordMap'

import { getAllUsers, updateUser } from '../user'

const fixGoals = async () => {
  const users = await getAllUsers(['id', 'goals'])

  await Promise.all(
    users.map((user) => {
      if (isRecordEmpty(user.goals)) {
        return
      }

      return updateUser(user.id, {
        goals: recordMap(user.goals, (goal) => ({
          ...goal,
          taskFactories: goal.taskFactories?.filter(
            (taskFactory) => taskFactory,
          ),
        })),
      })
    }),
  )
}

fixGoals()
