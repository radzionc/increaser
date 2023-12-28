import styled, { css } from 'styled-components'
import { HSLA } from '@lib/ui/colors/HSLA'

export const TimelineSession = styled.div<{ $color?: HSLA }>`
  position: absolute;
  width: 100%;

  border-radius: 2px;

  ${({ $color }) =>
    $color &&
    css`
      background: ${$color.toCssValue()};
    `};
`

export const SessionProjectIdentifier = styled.div<{ $color: HSLA }>`
  height: 100%;
  border-radius: 2px 0 0 2px;
  width: 4px;
  background: ${({ $color }) => $color.toCssValue()};
`
