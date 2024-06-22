import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const defaultWidth = 940

export const FixedWidthContent = styled.div<{ width?: number | string }>`
  max-width: ${({ width = defaultWidth }) => toSizeUnit(width)};
  width: ${({ width = defaultWidth }) => toSizeUnit(width)};
  height: 100%;
  @media (max-width: 1250px) {
    width: 100%;
  }
`
