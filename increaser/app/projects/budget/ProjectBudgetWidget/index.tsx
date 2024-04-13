import { useCurrentProject } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { ProjectBudgetWidgetHeader } from './ProjectBudgetWidgetHeader'
import { ProjectBudgetSummary } from './ProjectGoalStatus'
import { ProjectBudgetOverview } from './ProjectBudgetOverview'

export const ProjectBudgetWidget = () => {
  const { allocatedMinutesPerWeek, goal } = useCurrentProject()

  return (
    <VStack gap={4}>
      <ProjectBudgetWidgetHeader />
      <VStack style={{ height: 28 }}>
        {allocatedMinutesPerWeek > 0 && <ProjectBudgetOverview />}
      </VStack>
      <VStack style={{ minHeight: 20 }}>
        {goal && allocatedMinutesPerWeek > 0 && <ProjectBudgetSummary />}
      </VStack>
    </VStack>
  )
}
