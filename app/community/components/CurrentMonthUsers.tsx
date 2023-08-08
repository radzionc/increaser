import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { TitledSection } from '@increaser/ui/ui/Layout/TitledSection'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { Text } from '@increaser/ui/ui/Text'
import { useCurrentMonthUsersQuery } from 'community/queries/useCurrentMonthUsersQuery'
import { Fragment } from 'react'
import { TableLayout } from '@increaser/ui/ui/TableLayout'
import { formatDuration } from '@increaser/ui/shared/utils/formatDuration'

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export const CurrentMonthUsers = () => {
  const query = useCurrentMonthUsersQuery()

  const now = new Date()

  return (
    <QueryDependant
      {...query}
      success={(data) => (
        <TitledSection
          title={`${now.toLocaleString('default', {
            month: 'long',
          })} top performers`}
        >
          <TableLayout
            gridTemplateColumns="24px 160px 80px"
            columnNames={['#', 'Name', 'Daily avg.']}
          >
            {data.users.map(({ dailyAvgInMinutes, name, country }, index) => (
              <Fragment key={index}>
                <Text>{index + 1}.</Text>
                <Text>
                  {name || 'Anonymous'} {country ? getFlagEmoji(country) : ''}
                </Text>
                <Text>{formatDuration(dailyAvgInMinutes, 'min')}</Text>
              </Fragment>
            ))}
          </TableLayout>
        </TitledSection>
      )}
      error={() => <Text>Something went wrong</Text>}
      loading={() => <Spinner />}
    />
  )
}
