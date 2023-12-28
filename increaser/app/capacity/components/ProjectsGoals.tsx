import { ProjectWeeklyGoal } from '@increaser/app/focus/components/FocusSessionForm/ProjectWeeklyGoal'
import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { VStack } from '@lib/ui/layout/Stack'

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
