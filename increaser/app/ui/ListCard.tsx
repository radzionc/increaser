import { borderRadius } from '@lib/ui/css/borderRadius'
import styled from 'styled-components'

export const ListCard = styled.div`
  position: relative;
  overflow: hidden;
  ${borderRadius.m}
  background: ${({ theme }) => theme.colors.background.toCssValue()};
  padding: 20px;
`
