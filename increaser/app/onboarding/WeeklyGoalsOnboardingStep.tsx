import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentProjectProvider } from '../projects/components/ProjectView/CurrentProjectProvider'
import { ProjectGoalInput } from '../projects/components/ProjectGoalInput'

export const WeeklyGoalsOnboardingStep = () => {
  const { activeProjects } = useProjects()

  return (
    <VStack style={{ maxWidth: 440 }} gap={8}>
      {activeProjects
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((project) => (
          <CurrentProjectProvider key={project.id} value={project}>
            <ProjectGoalInput />
          </CurrentProjectProvider>
        ))}
    </VStack>
  )
}
