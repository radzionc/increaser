import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { floatingWidgetConfig } from './config'

export const FloatingWidgetHeader = styled(HStack)`
  padding: ${toSizeUnit(floatingWidgetConfig.padding)};
  padding-bottom: 12px;
  background: ${getColor('foreground')};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`
