import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import styled from 'styled-components'

export const BreakdownRowContent = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 8px 120px repeat(3, 92px);
  align-items: center;
  font-size: 14px;
  ${verticalPadding(6)};
  ${horizontalPadding(8)};

  > * {
    &:last-child,
    &:nth-last-child(2),
    &:nth-last-child(3) {
      justify-self: end;
    }
  }
`
