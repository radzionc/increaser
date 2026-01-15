import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const ShortcutHint = styled.span`
  ${borderRadius.xs};
  background: ${getColor('mist')};
  color: ${getColor('textSupporting')};
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  text-transform: uppercase;
`
