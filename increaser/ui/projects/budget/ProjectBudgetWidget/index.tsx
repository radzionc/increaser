import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { ProjectBudgetWidgetHeader } from './ProjectBudgetWidgetHeader'
import { ProjectBudgetOverview } from './ProjectBudgetOverview'
import { VStack } from '@lib/ui/layout/Stack'

export const ProjectBudgetWidget = () => {
  const { allocatedMinutesPerWeek } = useCurrentProject()

  return (
    <>
      <ProjectBudgetWidgetHeader />
      {allocatedMinutesPerWeek > 0 && (
        <VStack style={{ height: 28 }}>
          <ProjectBudgetOverview />
        </VStack>
      )}
    </>
  )
}
