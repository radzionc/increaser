import { getUser, updateUser } from '@increaser/db/user'

export const removeLastSet = async (userId: string) => {
  const { sets } = await getUser(userId, ['sets'])
  const newSets = sets.slice(0, -1)

  await updateUser(userId, {
    sets: newSets,
  })
}
