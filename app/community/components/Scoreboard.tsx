import { useCurrentMonthUsers } from './CurrentMonthUsersProvider'
import { Text } from '@increaser/ui/ui/Text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { ScoreboardDisplayName } from './ScoreboardDisplayName'
import { SeparatedByLine } from '@increaser/ui/ui/SeparatedByLine'
import { VStack } from '@increaser/ui/ui/Stack'
import { useAssertUserState } from 'user/state/UserStateContext'
import { ScoreboardCountryFlag } from './ScoreboardCountryFlag'

const Row = styled.div`
  display: grid;
  gap: 16px;
  align-items: center;
  align-content: center;
  grid-template-columns: 240px 80px 80px;
  position: relative;
`

const Outline = styled.div`
  pointer-events: none;
  position: absolute;
  background: transparent;
  left: -10px;
  top: -8px;
  border-radius: 8px;
  border: 2px solid ${getColor('primary')};
  width: calc(100% + 20px);
  height: calc(100% + 16px);
`

const Identity = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24px 24px 1fr;
  gap: 4px;
`

const ColumnName = styled(Text)`
  color: ${getColor('textSupporting')};
`

export const Scoreboard = () => {
  const { users } = useCurrentMonthUsers()
  const { id: myId } = useAssertUserState()

  return (
    <SeparatedByLine gap={16}>
      <Row>
        <ColumnName as="div">
          <Identity>
            <Text>#</Text>
            <ScoreboardCountryFlag />
            <Text>Name</Text>
          </Identity>
        </ColumnName>
        <ColumnName>Avg. block</ColumnName>
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
              <Row key={index}>
                {id === myId && <Outline />}
                <Identity>
                  <Text weight="semibold">{index + 1}.</Text>
                  <ScoreboardDisplayName name={name} country={country} />
                </Identity>

                <Text color="supporting" weight="semibold">
                  {formatDuration(avgBlockInMinutes, 'min')}
                </Text>

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
