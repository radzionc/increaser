import { getCountryFlagEmoji } from '@increaser/utils/getCountryFlagEmoji'
import { Fragment } from 'react'
import { useCurrentMonthUsers } from './CurrentMonthUsersProvider'
import { Text } from '@increaser/ui/ui/Text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { Line } from '@increaser/ui/ui/Line'
import { getColor } from '@increaser/ui/ui/theme/getters'

const Container = styled.div`
  display: grid;
  gap: 16px;
  align-items: center;
  grid-template-columns: 240px 80px 80px;
`

const Identity = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24px 24px 1fr;
  gap: 4px;
`

const ColumnName = styled(Text)`
  color: ${getColor('textShy')};
`

export const Scoreboard = () => {
  const { users } = useCurrentMonthUsers()

  return (
    <Container>
      <ColumnName as="div">
        <Identity>
          <Text>#</Text>
          <Text>🏳️</Text>
          <Text>Name</Text>
        </Identity>
      </ColumnName>
      <ColumnName>Avg. block</ColumnName>
      <ColumnName style={{ textAlign: 'end' }}>Daily avg.</ColumnName>
      <Line />
      {users
        .sort((a, b) => b.dailyAvgInMinutes - a.dailyAvgInMinutes)
        .map(
          ({ dailyAvgInMinutes, name, country, avgBlockInMinutes }, index) => (
            <Fragment key={index}>
              <Identity>
                <Text weight="semibold">{index + 1}.</Text>
                <Text color={country ? 'contrast' : 'shy'}>
                  {country ? getCountryFlagEmoji(country) : '🏳️'}
                </Text>
                <Text weight="semibold" color={name ? 'regular' : 'shy'}>
                  {name || 'Anonymous'}
                </Text>
              </Identity>

              <Text color="supporting" weight="semibold">
                {formatDuration(avgBlockInMinutes, 'min')}
              </Text>

              <Text weight="semibold" style={{ textAlign: 'end' }}>
                {formatDuration(dailyAvgInMinutes, 'min')}
              </Text>
            </Fragment>
          ),
        )}
    </Container>
  )
}
