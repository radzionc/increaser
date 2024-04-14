import { useCurrentProject } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { ProjectBudgetWidgetHeader } from './ProjectBudgetWidgetHeader'
import { ProjectBudgetOverview } from './ProjectBudgetOverview'

export const ProjectBudgetWidget = () => {
  const { allocatedMinutesPerWeek } = useCurrentProject()

  return (
    <VStack gap={4}>
      <ProjectBudgetWidgetHeader />
      <VStack style={{ height: 28 }}>
        {allocatedMinutesPerWeek > 0 && <ProjectBudgetOverview />}
      </VStack>
    </VStack>
  )
}
