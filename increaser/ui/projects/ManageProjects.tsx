import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'

import { ProjectList } from './ProjectList'
import { ProjectStatusFilterProvider } from './filter/status/ProjectStatusFilterProvider'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { ProjectStatusFilter } from './filter/status/ProjectStatusFilter'
import { AddProject } from './AddProject'

const Container = styled(VStack)`
  max-width: 560px;
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
        <ActiveItemIdProvider initialValue={null}>
          <VStack>
            <ProjectList />
          </VStack>
        </ActiveItemIdProvider>
      </Container>
    </ProjectStatusFilterProvider>
  )
}
