import { defaultBorderRadiusCSS } from '@increaser/ui/ui/borderRadius'
import styled from 'styled-components'

export const ListCard = styled.div`
  position: relative;
  overflow: hidden;
  ${defaultBorderRadiusCSS}
  background: ${({ theme }) => theme.colors.background.toCssValue()};
  padding: 20px;
`
