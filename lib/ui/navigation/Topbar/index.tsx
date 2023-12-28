import { useToggle } from 'react-use'
import styled from 'styled-components'

import { SidebarOpener } from './SidebarOpener'
import { CompleteMist } from '../../modal/CompleteMist'
import { Spacer } from '../../layout/Spacer'

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

interface Props {
  renderSidebar: () => React.ReactNode
}

export const Topbar = ({ renderSidebar }: Props) => {
  const [isSidebarOpen, toggleSidebar] = useToggle(false)

  return (
    <>
      {isSidebarOpen && (
        <Cover onClick={toggleSidebar}>{renderSidebar()}</Cover>
      )}
      <Container>
        <SidebarOpener onOpenSidebarRequest={toggleSidebar} />
      </Container>
      <Spacer height={20} />
    </>
  )
}
