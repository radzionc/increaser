import { IsActiveProp } from '@lib/ui/props'
import { matchColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { BarChartItemContainer } from '../chart/BarChartItemContainer'

export const IntervalBarChartItem = styled(BarChartItemContainer)<IsActiveProp>`
  background: ${matchColor('isActive', {
    true: 'foregroundExtra',
    false: 'mist',
  })};
`
