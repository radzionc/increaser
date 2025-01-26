import { HStack } from '@lib/ui/css/stack'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const FloatingWidgetHeader = styled(HStack)`
  padding: 8px 8px 8px 12px;
  background: ${getColor('foreground')};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`
