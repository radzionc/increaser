import { graphql } from '@increaser/api-interface/client'
import { useApi } from 'api/useApi'
import { useQuery } from 'react-query'
import { ScoreboardQuery } from '@increaser/api-interface/client/graphql'

const scoreboardQueryDocument = graphql(`
  query scoreboard($input: ScoreboardInput!) {
    scoreboard(input: $input) {
      id
      myPosition
      syncedAt
      users {
        dailyAvgInMinutes
        avgBlockInMinutes
        profile {
          name
          country
        }
      }
    }
  }
`)

export const useScoreboardQuery = (id: string) => {
  const { query } = useApi()

  return useQuery<ScoreboardQuery['scoreboard'], Error>(
    ['scoreboard', id],
    async () => {
      const { scoreboard } = await query(scoreboardQueryDocument, {
        input: { id },
      })

      return scoreboard
    },
    {},
  )
}
