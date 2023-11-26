import { useCurrentMonthUsers } from './CurrentMonthUsersProvider'
import { Text } from '@increaser/ui/text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { getColor } from '@increaser/ui/theme/getters'
import { ScoreboardDisplayName } from './ScoreboardDisplayName'
import { SeparatedByLine } from '@increaser/ui/layout/SeparatedByLine'
import { VStack } from '@increaser/ui/layout/Stack'
import { useAssertUserState } from 'user/state/UserStateContext'
import { ScoreboardCountryFlag } from './ScoreboardCountryFlag'
import { CountryCode } from '@increaser/utils/countries'
import { useIsScreenWidthLessThan } from '@increaser/ui/hooks/useIsScreenWidthLessThan'
import { absoluteOutline } from '@increaser/ui/css/absoluteOutline'

const Row = styled.div`
  display: grid;
  gap: 16px;
  align-items: center;
  align-content: center;
  position: relative;
`

const Outline = styled.div`
  ${absoluteOutline(10, 8)};
  background: transparent;
  border-radius: 8px;
  border: 2px solid ${getColor('primary')};
`

const Identity = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 20px auto 1fr;
  gap: 8px;
`

const ColumnName = styled(Text)`
  color: ${getColor('textSupporting')};
`

export const Scoreboard = () => {
  const { users } = useCurrentMonthUsers()
  const { id: myId } = useAssertUserState()

  const shouldHideAvgBlock = useIsScreenWidthLessThan(400)

  const rowStyle = shouldHideAvgBlock
    ? { gridTemplateColumns: '1fr 80px' }
    : { gridTemplateColumns: '1fr 80px 80px' }

  return (
    <SeparatedByLine gap={16}>
      <Row style={rowStyle}>
        <ColumnName as="div">
          <Identity>
            <Text>#</Text>
            <ScoreboardCountryFlag />
            <Text>Name</Text>
          </Identity>
        </ColumnName>
        {!shouldHideAvgBlock && <ColumnName>Avg. block</ColumnName>}
        <ColumnName style={{ textAlign: 'end' }}>Daily avg.</ColumnName>
      </Row>
      <VStack gap={16}>
        {users
          .sort((a, b) => b.dailyAvgInMinutes - a.dailyAvgInMinutes)
          .map(
            (
              { dailyAvgInMinutes, name, country, avgBlockInMinutes, id },
              index,
            ) => (
              <Row style={rowStyle} key={index}>
                {id === myId && <Outline />}
                <Identity>
                  <Text weight="semibold">{index + 1}.</Text>
                  <ScoreboardDisplayName
                    name={name}
                    country={country as CountryCode}
                  />
                </Identity>

                {!shouldHideAvgBlock && (
                  <Text color="supporting" weight="semibold">
                    {formatDuration(avgBlockInMinutes, 'min')}
                  </Text>
                )}

                <Text weight="semibold" style={{ textAlign: 'end' }}>
                  {formatDuration(dailyAvgInMinutes, 'min')}
                </Text>
              </Row>
            ),
          )}
      </VStack>
    </SeparatedByLine>
  )
}
