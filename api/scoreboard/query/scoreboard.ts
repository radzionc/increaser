import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { QueryResolvers } from '../../gql/schema'
import { getScoreboard } from '@increaser/db/scoreboard'
import { omit } from '@increaser/utils/record/omit'

export const scoreboard: QueryResolvers['scoreboard'] = async (
  _,
  { input: { id } },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const scoreboard = await getScoreboard(id)
  const myPosition = scoreboard.users.findIndex((item) => item.id === userId)

  return {
    ...scoreboard,
    myPosition,
    users: scoreboard.users.map((user) => omit(user, 'id')),
  }
}
