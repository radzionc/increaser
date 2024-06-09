import { recordMap } from '@lib/utils/record/recordMap'
import { getAllUsers, updateUser } from '../user'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@increaser/ui/projects/EnhancedProject'
;(async () => {
  const users = await getAllUsers(['id', 'goals'])

  await Promise.all(
    users.map(({ id, goals }) =>
      updateUser(id, {
        goals: recordMap(goals, (goal) => ({
          ...goal,
          emoji: randomlyPick(defaultEmojis),
        })),
      }),
    ),
  )
})()
