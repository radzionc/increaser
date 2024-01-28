import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { OnboardingStepView } from './OnboardingStepView'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentProjectProvider } from '../projects/components/ProjectView/CurrentProjectProvider'
import { ProjectGoalInput } from '../projects/components/ProjectGoalInput'
import { Text } from '@lib/ui/text'

export const WeeklyGoalsOnboardingStep = () => {
  const { activeProjects } = useProjects()

  return (
    <OnboardingStepView>
      <VStack gap={40}>
        <Text height="large">
          Establish weekly goals for key projects where increased effort will be
          most impactful. This approach encourages targeted dedication and helps
          in tracking significant progress on the projects that truly benefit
          from extra attention.
        </Text>
        <VStack style={{ maxWidth: 440 }} gap={8}>
          {activeProjects
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((project) => (
              <CurrentProjectProvider key={project.id} value={project}>
                <ProjectGoalInput />
              </CurrentProjectProvider>
            ))}
        </VStack>
      </VStack>
    </OnboardingStepView>
  )
}
