import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { VStack } from '@lib/ui/css/stack'
import { ProjectBudgetWidget } from '@increaser/ui/projects/budget/ProjectBudgetWidget'
import { ProjectBudgetSummary } from '@increaser/ui/projects/budget/ProjectBudgetWidget/ProjectBudgetSummary'
import { useFocusTargetProject } from '../hooks/useFocusTargetProject'

export const FocusLauncherBudget = () => {
  const project = shouldBePresent(useFocusTargetProject())

  if (project.allocatedMinutesPerWeek > 0) {
    return (
      <CurrentProjectProvider value={project}>
        <VStack gap={4}>
          <ProjectBudgetWidget />
          {project.goal && <ProjectBudgetSummary />}
        </VStack>
      </CurrentProjectProvider>
    )
  }

  return null
}
