import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import styled from 'styled-components'

export const EditorActiveSession = styled.div<{ $color: HSLA }>`
  position: absolute;
  left: 0;
  width: 100%;

  ${centerContentCSS}

  border-radius: 4px;

  border: 2px solid ${({ $color }) => $color.toCssValue()};
  background: ${({ $color }) =>
    $color.getVariant({ a: () => 0.12 }).toCssValue()};
`
