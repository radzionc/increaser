import { useBoolean } from '@lib/ui/hooks/useBoolean'
import styled from 'styled-components'
import { navigationPathInfo } from '@increaser/app/ui/Navigation/navigationPathInfo'
import { Sidebar } from '@increaser/app/ui/Navigation/Sidebar'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { SidebarOpener } from './SidebarOpener'
import { CompleteMist } from '@lib/ui/modal/CompleteMist'
import { Spacer } from '@lib/ui/layout/Spacer'
import { useCurrentPage } from '../../../navigation/hooks/useCurrentPage'
import { AppNavigationPage } from '@increaser/ui/navigation/app'

const Container = styled.div`
  width: 100%;
  padding: 12px 20px;
  display: grid;
  grid-template-columns: 28px 1fr 28px;
  align-items: center;
  justify-items: center;
`

const Cover = styled(CompleteMist)`
  justify-content: flex-start;
`

export const Topbar = () => {
  const page = useCurrentPage()
  const [isSidebarOpen, { toggle: toggleSidebar }] = useBoolean(false)

  const info = navigationPathInfo[page as AppNavigationPage]

  if (!info) return null

  return (
    <>
      {isSidebarOpen && (
        <Cover onClick={toggleSidebar}>
          <Sidebar />
        </Cover>
      )}
      <Container>
        <SidebarOpener onOpenSidebarRequest={toggleSidebar} />
        <Text size={14} weight="semibold" as="div">
          <HStack alignItems="center" gap={8}>
            {info.icon}
            <div>{info.name}</div>
          </HStack>
        </Text>
      </Container>
      <Spacer height={20} />
    </>
  )
}
