import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'

import { ProjectList } from './ProjectList'
import { ProjectStatusFilterProvider } from './filter/status/ProjectStatusFilterProvider'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { ProjectStatusFilter } from './filter/status/ProjectStatusFilter'
import { AddProject } from './AddProject'

const Container = styled(VStack)`
  max-width: 520px;
  width: 100%;
  gap: 20px;
`

export const ManageProjects = () => {
  return (
    <ProjectStatusFilterProvider initialValue="active">
      <PageHeaderControlsArea>
        <ProjectStatusFilter />
        <AddProject />
      </PageHeaderControlsArea>
      <Container>
        <VStack>
          <ProjectList />
        </VStack>
      </Container>
    </ProjectStatusFilterProvider>
  )
}
