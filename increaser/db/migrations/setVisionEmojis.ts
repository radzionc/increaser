import { recordMap } from '@lib/utils/record/recordMap'
import { getAllUsers, updateUser } from '../user'
import { visionAttributeIdeas } from '@increaser/entities/Vision'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
;(async () => {
  const users = await getAllUsers(['id', 'vision'])

  await Promise.all(
    users.map(({ id, vision }) =>
      updateUser(id, {
        vision: recordMap(vision, (item) => ({
          ...item,
          emoji:
            visionAttributeIdeas.find((idea) => idea.name === item.name)
              ?.emoji ?? randomlyPick(defaultEmojis),
        })),
      }),
    ),
  )
})()
