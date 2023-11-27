import { Text } from '@increaser/ui/text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { getColor } from '@increaser/ui/theme/getters'
import { ScoreboardDisplayName } from './ScoreboardDisplayName'
import { SeparatedByLine } from '@increaser/ui/layout/SeparatedByLine'
import { VStack } from '@increaser/ui/layout/Stack'
import { ScoreboardCountryFlag } from './ScoreboardCountryFlag'
import { CountryCode } from '@increaser/utils/countries'
import { useIsScreenWidthLessThan } from '@increaser/ui/hooks/useIsScreenWidthLessThan'
import { absoluteOutline } from '@increaser/ui/css/absoluteOutline'
import { UserPerformanceRecord } from '@increaser/api-interface/client/graphql'

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

interface ScoreboardProps {
  users: Omit<UserPerformanceRecord, 'id'>[]
  myPosition?: number
}

export const Scoreboard = ({ users, myPosition }: ScoreboardProps) => {
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
          .map(({ dailyAvgInMinutes, profile, avgBlockInMinutes }, index) => (
            <Row style={rowStyle} key={index}>
              {myPosition === index && <Outline />}
              <Identity>
                <Text weight="semibold">{index + 1}.</Text>
                <ScoreboardDisplayName
                  name={profile?.name || 'Anonymous'}
                  country={profile?.country as CountryCode}
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
          ))}
      </VStack>
    </SeparatedByLine>
  )
}
