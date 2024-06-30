import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'

import { ProjectsGroups } from './ProjectsGroups'

const Container = styled(VStack)`
  max-width: 520px;
  width: 100%;
  gap: 40px;
`

export const ManageProjects = () => {
  return (
    <Container>
      <ActiveItemIdProvider initialValue={null}>
        <ProjectsGroups />
      </ActiveItemIdProvider>
    </Container>
  )
}
