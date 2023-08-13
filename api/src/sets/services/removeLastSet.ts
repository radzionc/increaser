import * as usersDb from '../../users/db'

export const removeLastSet = async (userId: string) => {
  const { sets } = await usersDb.getUserById(userId, ['sets'])
  const newSets = sets.slice(0, -1)

  await usersDb.updateUser(userId, {
    sets: newSets,
  })
}
