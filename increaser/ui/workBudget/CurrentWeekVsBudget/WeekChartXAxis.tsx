import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ComponentWithValueProps } from '@lib/ui/props'
import styled from 'styled-components'
import { chartConfig } from './config'
import { range } from '@lib/utils/array/range'
import { D_IN_WEEK, getShortWeekday } from '@lib/utils/time'
import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { toPercents } from '@lib/utils/toPercents'
import { Text } from '@lib/ui/text'

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: ${toSizeUnit(chartConfig.expectedXLabelHeight)};
`

export const WeekChartXAxis = ({ value }: ComponentWithValueProps<number>) => {
  return (
    <Container
      style={{
        minHeight: chartConfig.expectedXLabelHeight,
      }}
    >
      {range(D_IN_WEEK).map((index) => {
        const isSelected = index === value
        return (
          <PositionAbsolutelyCenterVertically
            left={toPercents(index / (D_IN_WEEK - 1))}
          >
            <Text color={isSelected ? 'contrast' : 'shy'} size={12}>
              {getShortWeekday(index)}
            </Text>
          </PositionAbsolutelyCenterVertically>
        )
      })}
    </Container>
  )
}
