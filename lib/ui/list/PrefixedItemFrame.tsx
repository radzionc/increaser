import styled from 'styled-components'
import { toSizeUnit } from '../css/toSizeUnit'
import { verticalPadding } from '../css/verticalPadding'
import { centerContent } from '../css/centerContent'

type PrefixedItemFrameProps = {
  prefixWidth?: number
  lineHeight?: number
  gap?: number
  verticalPadding?: number
}

const defaultPrefixWidth = 24
const defaultGap = 12
const defaultVerticalPadding = 8
const defaultLineHeight = 24

export const PrefixedItemFrame = styled.div<PrefixedItemFrameProps>`
  display: grid;
  width: 100%;
  grid-template-columns: ${({ prefixWidth = defaultPrefixWidth }) =>
      toSizeUnit(prefixWidth)} 1fr;
  align-items: center;
  justify-items: start;
  gap: ${({ gap = defaultGap }) => toSizeUnit(gap)};
  font-weight: 500;
  font-size: 14px;
  ${({ verticalPadding: padding = defaultVerticalPadding }) =>
    verticalPadding(padding)};
  line-height: ${({ lineHeight = defaultLineHeight }) =>
    toSizeUnit(lineHeight)};
  > * {
    &:first-child {
      align-self: center;
      justify-self: center;
      min-height: ${({ lineHeight = defaultLineHeight }) =>
        toSizeUnit(lineHeight)};
      ${centerContent};
    }
  }
`
