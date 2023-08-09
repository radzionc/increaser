import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { Text } from '@increaser/ui/ui/Text'
import { useCurrentMonthUsersQuery } from 'community/queries/useCurrentMonthUsersQuery'
import { Fragment } from 'react'
import { TableLayout } from '@increaser/ui/ui/TableLayout'
import { formatDuration } from '@increaser/ui/shared/utils/formatDuration'
import { VStack } from '@increaser/ui/ui/Stack'
import { getCountryFlagEmoji } from '@increaser/ui/shared/utils/getCountryFlagEmoji'
import { LastScoreboardUpdate } from './LastScoreboardUpdate'

export const CurrentMonthUsers = () => {
  const query = useCurrentMonthUsersQuery()

  const now = new Date()

  return (
    <QueryDependant
      {...query}
      success={({ createdAt, users }) => (
        <VStack gap={20}>
          <VStack>
            <Text weight="bold" size={24}>
              {now.toLocaleString('default', {
                month: 'long',
              })}{' '}
              top performers
            </Text>
            <LastScoreboardUpdate updatedAt={createdAt} />
          </VStack>
          <TableLayout
            gridTemplateColumns="24px 160px 80px"
            columnNames={['#', 'Name', 'Daily avg.']}
          >
            {users.map(({ dailyAvgInMinutes, name, country }, index) => (
              <Fragment key={index}>
                <Text>{index + 1}.</Text>
                <Text>
                  {name || 'Anonymous'}{' '}
                  {country ? getCountryFlagEmoji(country) : ''}
                </Text>
                <Text>{formatDuration(dailyAvgInMinutes, 'min')}</Text>
              </Fragment>
            ))}
          </TableLayout>
        </VStack>
      )}
      error={() => <Text>Something went wrong</Text>}
      loading={() => <Spinner />}
    />
  )
}
