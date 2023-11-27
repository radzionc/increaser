import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { Spinner } from '@increaser/ui/loaders/Spinner'
import { Text } from '@increaser/ui/text'
import { LastScoreboardUpdate } from './LastScoreboardUpdate'
import { Scoreboard } from './Scoreboard'
import { Panel } from '@increaser/ui/panel/Panel'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { getMonthName } from '@increaser/utils/time/getMonthName'
import { CurrentMonthProgress } from './CurrentMonthProgress'
import { getDate } from 'date-fns'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { toMonth } from '@increaser/utils/time/toMonth'
import { monthToString } from '@increaser/utils/time/Month'
import { useScoreboardQuery } from 'community/queries/useScoreboardQuery'

export const CurrentMonthUsers = () => {
  const now = useRhythmicRerender(convertDuration(5, 'min', 'ms'))
  const monthId = monthToString(toMonth(now))
  const query = useScoreboardQuery(monthId)

  return (
    <Panel kind="secondary">
      <VStack gap={24}>
        <Text size={18} weight="semibold" color="regular">
          {getMonthName(now)} top performers
        </Text>
        <QueryDependant
          {...query}
          success={(value) => (
            <VStack gap={24}>
              <Scoreboard
                myPosition={value.myPosition ?? undefined}
                users={value.users}
              />
              <VStack gap={8}>
                <CurrentMonthProgress />
                <HStack justifyContent="space-between">
                  <Text color="supporting" size={14}>
                    Day #{getDate(Date.now())}
                  </Text>
                  <LastScoreboardUpdate value={value.syncedAt} />
                </HStack>
              </VStack>
            </VStack>
          )}
          error={() => <Text>Something went wrong</Text>}
          loading={() => <Spinner />}
        />
      </VStack>
    </Panel>
  )
}
