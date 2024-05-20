import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { css } from 'styled-components'

export const focusPageHorizontalPadding = css`
  ${horizontalPadding(40)};
  @media (max-width: 600px) {
    ${horizontalPadding(20)};
  }
`
