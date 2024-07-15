import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const PlanDayPromptOutline = styled.div`
  ${absoluteOutline(1, 1)};
  border: 1px dashed ${getColor('success')};
  ${borderRadius.s};
`
