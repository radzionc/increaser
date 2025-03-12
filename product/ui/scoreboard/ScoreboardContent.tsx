import { HStack, VStack } from '@lib/ui/css/stack'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { useApiQuery } from '@product/api-ui/hooks/useApiQuery'
import { ScoreboardPeriod } from '@product/entities/PerformanceScoreboard'
import { useUser } from '@product/ui/user/state/user'

import { LastScoreboardUpdate } from './LastScoreboardUpdate'
import { PublicProfilePrompt } from './PublicProfilePrompt'
import { ScoreboardTable } from './ScoreboardTable'

export const ScoreboardContent = () => {
  const scoreboardPeriod: ScoreboardPeriod = 'week'
  const query = useApiQuery('scoreboard', { id: scoreboardPeriod })
  const { isAnonymous } = useUser()

  return (
    <MatchQuery
      value={query}
      success={(value) => {
        const shouldShowPrompt = value.myPosition !== undefined && isAnonymous
        return (
          <VStack gap={24}>
            {shouldShowPrompt && <PublicProfilePrompt />}
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
