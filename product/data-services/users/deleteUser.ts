import { getAllFeatures, updateFeature } from '@product/db/features'
import { getScoreboard, updateScoreboard } from '@product/db/scoreboard'
import * as userDb from '@product/db/user'
import { scoreboardPeriods } from '@product/entities/PerformanceScoreboard'
import { deletePublicBucketFolder } from '@product/public/deletePublicBucketFolder'
import { getPublicBucketUserFolder } from '@product/public/getPublickBucketUserFolder'

export const deleteUser = async (id: string) => {
  console.log(`Deleting user with id: ${id}`)

  await userDb.deleteUser(id)

  await deletePublicBucketFolder(getPublicBucketUserFolder(id))

  const features = await getAllFeatures(['id', 'proposedBy'])
  const featuresToUpdate = features.filter(
    (feature) => feature.proposedBy === id,
  )
  await Promise.all(
    featuresToUpdate.map((feature) =>
      updateFeature(feature.id, {
        proposedBy: undefined,
      }),
    ),
  )

  const scoreboards = await Promise.all(
    scoreboardPeriods.map((period) => getScoreboard(period)),
  )
  await Promise.all(
    scoreboards.map((scoreboard) => {
      const isUserInScoreboard = scoreboard.users.find((user) => user.id === id)
      if (isUserInScoreboard) {
        return updateScoreboard(scoreboard.id, {
          users: scoreboard.users.filter((user) => user.id !== id),
        })
      }
    }),
  )
}
