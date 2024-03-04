import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { getFeature, updateFeature } from '@increaser/db/features'

export const voteForFeature: ApiResolver<'voteForFeature'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)
  const { upvotedBy } = await getFeature(id, ['upvotedBy'])

  await updateFeature(id, {
    upvotedBy: upvotedBy.includes(userId)
      ? upvotedBy.filter((u) => u !== userId)
      : [...upvotedBy, userId],
  })
}
