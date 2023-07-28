import { useProjects } from 'projects/hooks/useProjects'
import { useTheme } from 'styled-components'
import { VStack } from '@increaser/ui/ui/Stack'

import { CreateProjectNavigationItem } from './CreateProjectNavigationItem'
import { ProjectsNavigationSection } from './ProjectsNavigationSection'

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
