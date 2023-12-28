import { assertUserId } from '../../auth/assertUserId'
import { getScoreboard } from '@increaser/db/scoreboard'
import { omit } from '@lib/utils/record/omit'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const scoreboard: ApiResolver<'scoreboard'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  const scoreboard = await getScoreboard(id)
  const myPosition = scoreboard.users.findIndex((item) => item.id === userId)

  return {
    ...scoreboard,
    myPosition,
    users: scoreboard.users.map((user) => omit(user, 'id')),
  }
}
