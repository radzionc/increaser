import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useFocusLauncherProject } from './hooks/useFocusLauncherProject'
import { useProjectDoneMinutesThisWeek } from '@increaser/ui/projects/hooks/useProjectDoneMinutesThisWeek'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { VStack } from '@lib/ui/css/stack'
import { ProjectBudgetWidget } from '@increaser/ui/projects/budget/ProjectBudgetWidget'
import { ProjectBudgetSummary } from '@increaser/ui/projects/budget/ProjectBudgetWidget/ProjectBudgetSummary'

export const FocusLauncherBudget = () => {
  const project = shouldBePresent(useFocusLauncherProject())

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(project.id)

  if (project.allocatedMinutesPerWeek > 0 && doneMinutesThisWeek > 0) {
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
