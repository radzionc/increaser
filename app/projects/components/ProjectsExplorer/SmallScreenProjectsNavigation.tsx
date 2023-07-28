import { useProjects } from 'projects/hooks/useProjects'
import { useMemo } from 'react'
import styled from 'styled-components'
import { HStack } from '@increaser/ui/ui/Stack'
import { hideScrollbarsCSS } from '@increaser/ui/ui/utils/hideScrollbarsCSS'

import { SmallScreenCreateProjectNavigationItem } from './SmallScreenCreateProjectNavigationItem'
import { SmallScreenProjectNavigationItem } from './SmallScreenProjectNavigationItem'

const Container = styled(HStack)`
  gap: 8px;
  position: relative;
  overflow-x: auto;
  width: 100%;
  ${hideScrollbarsCSS};
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
