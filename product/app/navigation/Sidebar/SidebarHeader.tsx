import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

import { HeaderActions } from '../HeaderActions'
import { ProductLogo } from '../ProductLogo'

import { sidebarConfig } from './config'

const Container = styled(HStack)`
  ${horizontalPadding(sidebarConfig.item.horizontalPadding)};
  padding-right: 0;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: ${toSizeUnit(sidebarConfig.headerHeight)};
  svg {
    font-size: 20px;
  }
`

export const SidebarHeader = () => {
  return (
    <Container>
      <ProductLogo />
      <HeaderActions />
    </Container>
  )
}
