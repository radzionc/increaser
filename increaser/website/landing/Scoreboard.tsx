import { QueryDependant } from '@lib/ui/query/components/QueryDependant'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { Text } from '@lib/ui/text'
import { Panel } from '@lib/ui/css/panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import {
  ScoreboardPeriod,
  scoreboardPeriodInDays,
} from '@increaser/entities/PerformanceScoreboard'
import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { LastScoreboardUpdate } from '@increaser/ui/scoreboard/LastScoreboardUpdate'
import { ScoreboardTable } from '@increaser/ui/scoreboard/ScoreboardTable'

export const Scoreboard = () => {
  const scoreboardPeriod: ScoreboardPeriod = 'week'
  const query = useApiQuery('scoreboard', { id: scoreboardPeriod })

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
