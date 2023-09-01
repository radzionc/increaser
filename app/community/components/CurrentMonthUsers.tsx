import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { Text } from '@increaser/ui/ui/Text'
import { useCurrentMonthUsersQuery } from 'community/queries/useCurrentMonthUsersQuery'
import { LastScoreboardUpdate } from './LastScoreboardUpdate'
import { CurrentMonthUsersProvider } from './CurrentMonthUsersProvider'
import { Scoreboard } from './Scoreboard'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { getMonthName } from '@increaser/utils/time/getMonthName'
import { CurrentMonthProgress } from './CurrentMonthProgress'
import { getDate } from 'date-fns'

export const CurrentMonthUsers = () => {
  const query = useCurrentMonthUsersQuery()

  return (
    <Panel kind="secondary">
      <VStack gap={24}>
        <Text size={18} weight="semibold" color="regular">
          {getMonthName(Date.now())} top performers
        </Text>
        <QueryDependant
          {...query}
          success={(value) => (
            <CurrentMonthUsersProvider value={value}>
              <VStack gap={24}>
                <Scoreboard />
                <VStack gap={8}>
                  <CurrentMonthProgress />
                  <HStack justifyContent="space-between">
                    <Text color="supporting" size={14}>
                      Day #{getDate(Date.now())}
                    </Text>
                    <LastScoreboardUpdate />
                  </HStack>
                </VStack>
              </VStack>
            </CurrentMonthUsersProvider>
          )}
          error={() => <Text>Something went wrong</Text>}
          loading={() => <Spinner />}
        />
      </VStack>
    </Panel>
  )
}
