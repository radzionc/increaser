import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const SelectedArea = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  background: ${getColor('mist')};
  pointer-events: none;
  ${borderRadius.m};
  border: 1px solid ${getColor('mist')};
`
