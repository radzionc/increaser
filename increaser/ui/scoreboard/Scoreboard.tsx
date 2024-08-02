import { QueryDependant } from '@lib/ui/query/components/QueryDependant'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { Text } from '@lib/ui/text'
import { LastScoreboardUpdate } from './LastScoreboardUpdate'
import { ScoreboardTable } from './ScoreboardTable'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import {
  ScoreboardPeriod,
  scoreboardPeriodInDays,
} from '@increaser/entities/PerformanceScoreboard'
import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { useAssertUserState } from '../user/UserStateContext'
import { PublicProfilePrompt } from './PublicProfilePrompt'

export const Scoreboard = () => {
  const scoreboardPeriod: ScoreboardPeriod = 'week'
  const query = useApiQuery('scoreboard', { id: scoreboardPeriod })
  const { isAnonymous } = useAssertUserState()

  return (
    <Panel kind="secondary">
      <VStack gap={24}>
        <SectionTitle>
          Last {scoreboardPeriodInDays[scoreboardPeriod]} days top performers
        </SectionTitle>
        <QueryDependant
          query={query}
          success={(value) => (
            <VStack gap={24}>
              {value.myPosition && isAnonymous && <PublicProfilePrompt />}
              <ScoreboardTable
                myPosition={value.myPosition}
                users={value.users}
              />
              <HStack fullWidth justifyContent="end">
                <LastScoreboardUpdate value={value.syncedAt} />
              </HStack>
            </VStack>
          )}
          error={() => <Text>Something went wrong</Text>}
          pending={() => <Spinner />}
        />
      </VStack>
    </Panel>
  )
}
