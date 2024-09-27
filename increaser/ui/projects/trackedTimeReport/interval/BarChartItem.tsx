import { borderRadius } from '@lib/ui/css/borderRadius'
import { ComponentWithActiveState } from '@lib/ui/props'
import { matchColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const BarChartItem = styled.div<ComponentWithActiveState>`
  width: calc(100% - 4px);
  ${borderRadius.s};
  overflow: hidden;
  background: ${matchColor('isActive', {
    true: 'textShy',
    false: 'mist',
  })};
`
