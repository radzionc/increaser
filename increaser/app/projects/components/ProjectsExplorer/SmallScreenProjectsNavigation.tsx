import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { useMemo } from 'react'
import styled from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'

import { SmallScreenCreateProjectNavigationItem } from './SmallScreenCreateProjectNavigationItem'
import { SmallScreenProjectNavigationItem } from './SmallScreenProjectNavigationItem'
import { hideScrollbars } from '@lib/ui/css/hideScrollbars'

const Container = styled(HStack)`
  gap: 8px;
  position: relative;
  overflow-x: auto;
  width: 100%;
  ${hideScrollbars};
`

export const SmallScreenProjectsNavigation = () => {
  const { activeProjects, inactiveProjects } = useProjects()

  const sortedProjects = useMemo(
    () =>
      [...activeProjects, ...inactiveProjects].sort(
        (a, b) => b.total - a.total,
      ),
    [activeProjects, inactiveProjects],
  )

  return (
    <Container>
      <SmallScreenCreateProjectNavigationItem />
      {sortedProjects.map((project) => (
        <SmallScreenProjectNavigationItem key={project.id} {...project} />
      ))}
    </Container>
  )
}
