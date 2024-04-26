import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { ComponentWithValueProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { D_IN_WEEK } from '@lib/utils/time'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'

const Line = styled.div`
  height: 100%;
  border-left: ${toSizeUnit(2)} dashed;
  color: ${getColor('mistExtra')};
`

export const CurrentDayLine = ({ value }: ComponentWithValueProps<number>) => (
  <PositionAbsolutelyCenterVertically
    fullHeight
    style={{
      pointerEvents: 'none',
    }}
    left={toPercents(value / (D_IN_WEEK - 1))}
  >
    <Line />
  </PositionAbsolutelyCenterVertically>
)
