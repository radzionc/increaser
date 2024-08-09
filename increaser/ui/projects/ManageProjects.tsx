import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'

import { ProjectList } from './ProjectList'
import { ProjectStatusFilterProvider } from './filter/status/ProjectStatusFilterProvider'
import { CreateProjectPrompt } from './CreateProjectPrompt'
import { ProjectsHeader } from './ProjectsHeader'

const Container = styled(VStack)`
  max-width: 520px;
  width: 100%;
  gap: 20px;
`

export const ManageProjects = () => {
  return (
    <Container>
      <ProjectStatusFilterProvider initialValue="active">
        <ProjectsHeader />
        <ActiveItemIdProvider initialValue={null}>
          <VStack>
            <ProjectList />
            <CreateProjectPrompt />
          </VStack>
        </ActiveItemIdProvider>
      </ProjectStatusFilterProvider>
    </Container>
  )
}
