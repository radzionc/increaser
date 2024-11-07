import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { getAllUsers, updateUser } from '../user'
import { recordMap } from '@lib/utils/record/recordMap'

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
