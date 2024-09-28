import { ComponentWithActiveState } from '@lib/ui/props'
import { matchColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { BarChartItemContainer } from '../chart/BarChartItemContainer'

export const IntervalBarChartItem = styled(
  BarChartItemContainer,
)<ComponentWithActiveState>`
  background: ${matchColor('isActive', {
    true: 'foregroundExtra',
    false: 'mist',
  })};
`
