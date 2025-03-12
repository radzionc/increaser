import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const TaskTrackedTimeContainer = styled.span`
  font-weight: 500;
  padding: 4px 8px;
  background: ${getColor('mist')};
  ${borderRadius.xs};
  color: ${getColor('text')};
  margin-right: 8px;
  font-size: 14px;
`
