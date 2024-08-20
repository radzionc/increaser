import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'

import { ProjectList } from './ProjectList'
import { ProjectStatusFilterProvider } from './filter/status/ProjectStatusFilterProvider'
import { CreateProjectPrompt } from './CreateProjectPrompt'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { ProjectStatusFilter } from './filter/status/ProjectStatusFilter'

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
      </PageHeaderControlsArea>
      <Container>
        <ActiveItemIdProvider initialValue={null}>
          <VStack>
            <ProjectList />
            <CreateProjectPrompt />
          </VStack>
        </ActiveItemIdProvider>
      </Container>
    </ProjectStatusFilterProvider>
  )
}
