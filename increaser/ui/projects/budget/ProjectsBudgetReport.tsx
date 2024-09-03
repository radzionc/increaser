import { CurrentWeekProgress } from '@increaser/ui/projects/budget/CurrentWeekProgress'
import { PreviousWeeksProgress } from '@increaser/ui/projects/budget/PreviousWeeks/PreviousWeeksProgress'
import { useProjectsBudgetReportView } from './report/useProjectsBudgetReportView'
import { VStack } from '@lib/ui/layout/Stack'
import { Header } from '@lib/ui/layout/Header'
import { ProjectsBudgetReportViewSelector } from './report/ProjectsBudgetReportView'
import { Match } from '@lib/ui/base/Match'
import { Panel } from '@lib/ui/css/panel'
import { BudgetRequired } from './BudgetRequired'

export const ProjectsBudgetReport = () => {
  const [view] = useProjectsBudgetReportView()

  return (
    <VStack gap={24}>
      <Header>
        <div />
        <ProjectsBudgetReportViewSelector />
      </Header>
      <Panel kind="secondary">
        <VStack gap={20}>
          <BudgetRequired>
            <Match
              value={view}
              thisWeek={() => <CurrentWeekProgress />}
              previousWeeks={() => <PreviousWeeksProgress />}
            />
          </BudgetRequired>
        </VStack>
      </Panel>
    </VStack>
  )
}
