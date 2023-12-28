import { HSLA } from '@lib/ui/colors/HSLA'
import { centerContent } from '@lib/ui/css/centerContent'
import styled from 'styled-components'

export const EditorActiveSession = styled.div<{ $color: HSLA }>`
  position: absolute;
  left: 0;
  width: 100%;

  ${centerContent}

  border-radius: 4px;

  border: 2px solid ${({ $color }) => $color.toCssValue()};
  background: ${({ $color }) =>
    $color.getVariant({ a: () => 0.12 }).toCssValue()};
`
