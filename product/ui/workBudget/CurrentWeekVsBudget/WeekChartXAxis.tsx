import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { uniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { range } from '@lib/utils/array/range'
import { D_IN_WEEK, getShortWeekday } from '@lib/utils/time'
import styled from 'styled-components'

import { chartConfig } from './config'

const Container = styled.div`
  ${uniformColumnGrid({ gap: 0 })}
  position: relative;
  width: 100%;
  min-height: ${toSizeUnit(chartConfig.expectedXLabelHeight)};
  justify-items: center;
`

export const WeekChartXAxis = ({ value }: ValueProp<number>) => {
  return (
    <Container>
      {range(D_IN_WEEK).map((index) => {
        const isSelected = index === value
        return (
          <Text key={index} color={isSelected ? 'contrast' : 'shy'} size={12}>
            {getShortWeekday(index)}
          </Text>
        )
      })}
    </Container>
  )
}
