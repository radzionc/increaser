import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'

import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { ProjectStatusFilter } from './filter/status/ProjectStatusFilter'
import { AddProject } from './AddProject'
import { ProjectsPageContent } from './ProjectsPageContent'

const Container = styled(VStack)`
  max-width: 560px;
  width: 100%;
  gap: 20px;
`

export const ManageProjects = () => {
  return (
    <>
      <PageHeaderControlsArea>
        <ProjectStatusFilter />
        <AddProject />
      </PageHeaderControlsArea>
      <Container>
        <ProjectsPageContent />
      </Container>
    </>
  )
}
