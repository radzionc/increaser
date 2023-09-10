import { useBoolean } from '@increaser/ui/hooks/useBoolean'
import styled from 'styled-components'
import { navigationPathInfo } from 'ui/Navigation/navigationPathInfo'
import { Sidebar } from 'ui/Navigation/Sidebar'
import { ScreenCover } from '@increaser/ui/ui//ScreenCover'
import { Spacer } from '@increaser/ui/ui//Spacer'
import { HStack } from '@increaser/ui/ui//Stack'
import { Text } from '@increaser/ui/ui//Text'

import { SidebarOpener } from './SidebarOpener'
import { useRouter } from 'next/router'

const Container = styled.div`
  width: 100%;
  padding: 12px 20px;
  display: grid;
  grid-template-columns: 28px 1fr 28px;
  align-items: center;
  justify-items: center;
`

const Cover = styled(ScreenCover)`
  justify-content: flex-start;
`

export const Topbar = () => {
  const { pathname } = useRouter()
  const [isSidebarOpen, { toggle: toggleSidebar }] = useBoolean(false)

  const path = pathname as keyof typeof navigationPathInfo
  const info = navigationPathInfo[path]

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
        <Text as="div" size={18}>
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
