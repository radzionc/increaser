import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { getAllUsers, updateUser } from '../user'
import { recordMap } from '@lib/utils/record/recordMap'

const updateIdeas = async () => {
  const users = await getAllUsers(['id', 'ideas'])

  await Promise.all(
    users.map((user) => {
      if (isRecordEmpty(user.ideas)) {
        return
      }

      return updateUser(user.id, {
        ideas: recordMap(user.ideas, (idea, index) => ({
          ...idea,
          checklist: [],
          links: [],
          order: index,
        })),
      })
    }),
  )
}

updateIdeas()
