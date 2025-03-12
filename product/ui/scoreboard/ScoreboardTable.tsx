import { CountryCode } from '@lib/countries'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { VStack } from '@lib/ui/css/stack'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { order } from '@lib/utils/array/order'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { UserPerformanceRecord } from '@product/entities/PerformanceScoreboard'
import styled from 'styled-components'

import { ScoreboardCountryFlag } from './ScoreboardCountryFlag'
import { ScoreboardDisplayName } from './ScoreboardDisplayName'

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
  grid-template-columns: 28px auto 1fr;
  gap: 8px;
`

const ColumnName = styled(Text)`
  color: ${getColor('textSupporting')};
`

interface ScoreboardProps {
  users: Omit<UserPerformanceRecord, 'id'>[]
  myPosition?: number
}

export const ScoreboardTable = ({ users, myPosition }: ScoreboardProps) => {
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
        {order(users, (u) => u.dailyAvgInMinutes, 'desc').map(
          ({ dailyAvgInMinutes, profile, avgBlockInMinutes }, index) => (
            <Row style={rowStyle} key={index}>
              {myPosition === index && <Outline />}
              <Identity>
                <Text weight="500">{index + 1}.</Text>
                <ScoreboardDisplayName
                  name={profile?.name || 'Anonymous'}
                  country={profile?.country as CountryCode}
                />
              </Identity>

              {!shouldHideAvgBlock && (
                <Text color="supporting" weight="500">
                  {formatDuration(avgBlockInMinutes, 'min')}
                </Text>
              )}

              <Text weight="500" style={{ textAlign: 'end' }}>
                {formatDuration(dailyAvgInMinutes, 'min')}
              </Text>
            </Row>
          ),
        )}
      </VStack>
    </SeparatedByLine>
  )
}
