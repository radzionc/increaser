import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { sidebarConfig } from '../../navigation/Sidebar/config'

export const PageContent = styled(VStack)`
  gap: ${toSizeUnit(sidebarConfig.gap)};
  flex: 1 1 auto;
`
