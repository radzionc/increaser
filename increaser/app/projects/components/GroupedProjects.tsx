import { projectsStatuses } from '@increaser/entities/Project'
import { ProjectsGroup } from './ProjectsGroup'
import { VStack } from '@lib/ui/layout/Stack'

export const GroupedProjects = () => {
  return (
    <VStack gap={40}>
      {projectsStatuses.map((status) => (
        <ProjectsGroup key={status} value={status} />
      ))}
    </VStack>
  )
}
