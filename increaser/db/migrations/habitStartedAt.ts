import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { getAllUsers, updateUser } from '../user'
import { recordMap } from '@lib/utils/record/recordMap'
import { convertDuration } from '@lib/utils/time/convertDuration'

const habitStartedAt = async () => {
  const users = await getAllUsers(['id', 'habits'])

  await Promise.all(
    users.map((user) => {
      if (isRecordEmpty(user.habits)) {
        return
      }

      return updateUser(user.id, {
        habits: recordMap(user.habits, (habit) => ({
          ...habit,
          startedAt: convertDuration(habit.startedAt, 's', 'ms'),
        })),
      })
    }),
  )
}

habitStartedAt()
