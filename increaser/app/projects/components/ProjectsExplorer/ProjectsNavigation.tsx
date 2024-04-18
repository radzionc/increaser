import { useTheme } from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'

import { CreateProjectNavigationItem } from './CreateProjectNavigationItem'
import { ProjectsNavigationSection } from './ProjectsNavigationSection'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { projectsStatuses } from '@increaser/entities/Project'
import { getProjectStatusColor } from '../../utils/getProjectStatusColor'

export const ProjectsNavigation = () => {
  const { projects } = useProjects()

  const theme = useTheme()

  return (
    <VStack gap={20} fullWidth>
      {projectsStatuses.map((status) => {
        return (
          <ProjectsNavigationSection
            key={status}
            color={getProjectStatusColor(status, theme)}
            name={status}
            projects={projects.filter((project) => project.status === status)}
          >
            {status === 'active' && <CreateProjectNavigationItem />}
          </ProjectsNavigationSection>
        )
      })}
    </VStack>
  )
}
