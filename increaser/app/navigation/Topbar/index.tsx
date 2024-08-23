import { useBoolean } from '@lib/ui/hooks/useBoolean'
import styled from 'styled-components'

import { CompleteMist } from '@lib/ui/modal/CompleteMist'
import { Sidebar } from '../Sidebar'
import { topbarConfig } from './config'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { MenuIcon } from '@lib/ui/icons/MenuIcon'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { interactive } from '@lib/ui/css/interactive'
import { centerContent } from '@lib/ui/css/centerContent'
import { getColor } from '@lib/ui/theme/getters'
import { ProductLogo } from '../ProductLogo'
import { CenterAbsolutely } from '@lib/ui/layout/CenterAbsolutely'
import { HeaderActions } from '../HeaderActions'

const ToggleButton = styled.div`
  ${interactive};
  ${centerContent};
  color: ${getColor('contrast')};
  height: 100%;
  font-size: 20px;
  ${horizontalPadding(topbarConfig.horizontalPadding)};
`

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-right: ${toSizeUnit(topbarConfig.horizontalPadding)};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${getColor('foreground')};
`

const Cover = styled(CompleteMist)`
  justify-content: flex-start;
`

const Logo = styled(ProductLogo)`
  font-size: 14px;
  gap: 6px;
  color: ${getColor('textSupporting')};

  svg {
    font-size: 1em;
  }
`

export const Topbar = () => {
  const [isSidebarOpen, { toggle: toggleSidebar }] = useBoolean(false)

  return (
    <>
      {isSidebarOpen && (
        <Cover onClick={toggleSidebar}>
          <Sidebar />
        </Cover>
      )}
      <Container>
        <ToggleButton onClick={toggleSidebar}>
          <MenuIcon />
        </ToggleButton>
        <CenterAbsolutely style={{ pointerEvents: 'none' }}>
          <Logo />
        </CenterAbsolutely>
        <HeaderActions />
      </Container>
    </>
  )
}
