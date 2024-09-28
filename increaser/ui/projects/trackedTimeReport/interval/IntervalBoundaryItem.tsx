import { getColor } from '@lib/ui/theme/getters'
import { match } from '@lib/utils/match'
import styled, { css } from 'styled-components'

export type IntervalBoundaryStatus = 'idle' | 'hovered' | 'active'

export const IntervalBoundaryItem = styled.div<{
  status: IntervalBoundaryStatus
}>`
  height: 100%;

  width: 1px;
  background: ${getColor('contrast')};
  pointer-events: none;

  ${({ status }) =>
    match(status, {
      idle: () => css``,
      hovered: () => css`
        width: 4px;
      `,
      active: () => css`
        background: ${getColor('primary')};
      `,
    })}
`
