import { useBoolean } from '@increaser/ui/hooks/useBoolean'
import styled from 'styled-components'
import { navigationPathInfo } from 'ui/Navigation/navigationPathInfo'
import { Sidebar } from 'ui/Navigation/Sidebar'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

import { SidebarOpener } from './SidebarOpener'
import { useRouter } from 'next/router'
import { CompleteMist } from '@increaser/ui/modal/CompleteMist'
import { Spacer } from '@increaser/ui/layout/Spacer'

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
