import { HStack, VStack } from '@lib/ui/css/stack'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { useApiQuery } from '@product/api-ui/hooks/useApiQuery'
import { ScoreboardPeriod } from '@product/entities/PerformanceScoreboard'

import { LastScoreboardUpdate } from './LastScoreboardUpdate'
import { ScoreboardTable } from './ScoreboardTable'

export const ScoreboardContent = () => {
  const scoreboardPeriod: ScoreboardPeriod = 'week'
  const query = useApiQuery('scoreboard', { id: scoreboardPeriod })

  return (
    <MatchQuery
      value={query}
      success={(value) => {
        return (
          <VStack gap={24}>
            <ScoreboardTable
              myPosition={value.myPosition}
              users={value.users}
            />
            <HStack fullWidth justifyContent="end">
              <LastScoreboardUpdate value={value.syncedAt} />
            </HStack>
          </VStack>
        )
      }}
      error={() => <Text>Something went wrong</Text>}
      pending={() => <Spinner />}
    />
  )
}
