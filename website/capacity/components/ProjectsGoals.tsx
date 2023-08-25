import { ProjectWeeklyGoal } from './ProjectWeeklyGoal'
import { useProjects } from 'projects/hooks/useProjects'
import { VStack } from '@increaser/ui/ui/Stack'

export const ProjectsGoals = () => {
  const { allocatedProjects } = useProjects()

  return (
    <VStack gap={20}>
      {allocatedProjects.map(({ id }) => (
        <ProjectWeeklyGoal key={id} projectId={id} />
      ))}
    </VStack>
  )
}
