import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { Text } from '@increaser/ui/ui/Text'
import { useCurrentMonthUsersQuery } from 'community/queries/useCurrentMonthUsersQuery'
import { LastScoreboardUpdate } from './LastScoreboardUpdate'
import { SeparatedByLine } from '@increaser/ui/ui/SeparatedByLine'
import { CurrentMonthUsersProvider } from './CurrentMonthUsersProvider'
import { Scoreboard } from './Scoreboard'

export const CurrentMonthUsers = () => {
  const query = useCurrentMonthUsersQuery()

  return (
    <QueryDependant
      {...query}
      success={(value) => (
        <CurrentMonthUsersProvider value={value}>
          <SeparatedByLine gap={20}>
            <Scoreboard />
            <LastScoreboardUpdate />
          </SeparatedByLine>
        </CurrentMonthUsersProvider>
      )}
      error={() => <Text>Something went wrong</Text>}
      loading={() => <Spinner />}
    />
  )
}
