import { QueryDependant } from '@lib/ui/query/components/QueryDependant'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { Text } from '@lib/ui/text'
import { LastScoreboardUpdate } from './LastScoreboardUpdate'
import { ScoreboardTable } from './ScoreboardTable'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { ScoreboardPeriod } from '@increaser/entities/PerformanceScoreboard'
import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'
import { useAssertUserState } from '../user/UserStateContext'
import { PublicProfilePrompt } from './PublicProfilePrompt'

export const ScoreboardContent = () => {
  const scoreboardPeriod: ScoreboardPeriod = 'week'
  const query = useApiQuery('scoreboard', { id: scoreboardPeriod })
  const { isAnonymous } = useAssertUserState()

  return (
    <QueryDependant
      query={query}
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
