import styled from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'

import { SmallScreenCreateProjectNavigationItem } from './SmallScreenCreateProjectNavigationItem'
import { SmallScreenProjectNavigationItem } from './SmallScreenProjectNavigationItem'
import { hideScrollbars } from '@lib/ui/css/hideScrollbars'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

const Container = styled(HStack)`
  gap: 8px;
  position: relative;
  overflow-x: auto;
  width: 100%;
  ${hideScrollbars};
`

export const SmallScreenProjectsNavigation = () => {
  const { projects } = useProjects()

  return (
    <Container>
      <SmallScreenCreateProjectNavigationItem />
      {projects.map((project) => (
        <SmallScreenProjectNavigationItem key={project.id} {...project} />
      ))}
    </Container>
  )
}
