import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { Spinner } from '@increaser/ui/loaders/Spinner'
import { Text } from '@increaser/ui/text'
import { LastScoreboardUpdate } from './LastScoreboardUpdate'
import { ScoreboardTable } from './ScoreboardTable'
import { Panel } from '@increaser/ui/panel/Panel'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import {
  ScoreboardPeriod,
  scoreboardPeriodInDays,
} from '@increaser/entities/PerformanceScoreboard'
import { useApiQuery } from 'api/hooks/useApiQuery'

export const Scoreboard = () => {
  const scoreboardPeriod: ScoreboardPeriod = 'month'
  const query = useApiQuery('scoreboard', { id: scoreboardPeriod })

  return (
    <Panel kind="secondary">
      <VStack gap={24}>
        <Text size={18} weight="semibold" color="regular">
          Last {scoreboardPeriodInDays[scoreboardPeriod]} Days Top Performers
        </Text>
        <QueryDependant
          {...query}
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
          loading={() => <Spinner />}
        />
      </VStack>
    </Panel>
  )
}
