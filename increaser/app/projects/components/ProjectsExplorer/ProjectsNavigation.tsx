import { useTheme } from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'

import { CreateProjectNavigationItem } from './CreateProjectNavigationItem'
import { ProjectsNavigationSection } from './ProjectsNavigationSection'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

export const ProjectsNavigation = () => {
  const { activeProjects, inactiveProjects } = useProjects()

  const { colors } = useTheme()

  return (
    <VStack gap={20} fullWidth>
      <ProjectsNavigationSection
        color={colors.success}
        projects={activeProjects}
        name="active"
      >
        <CreateProjectNavigationItem />
      </ProjectsNavigationSection>
      <ProjectsNavigationSection
        color={colors.alert}
        name="inactive"
        projects={inactiveProjects}
      />
    </VStack>
  )
}
