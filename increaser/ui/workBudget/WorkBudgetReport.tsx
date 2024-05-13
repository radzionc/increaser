import { Panel } from '@lib/ui/panel/Panel'
import { WorkBudgetDaysReport } from './WorkBudgetDaysReport'
import { WorkBudgetWeeksReport } from './WorkBudgetWeeksReport'
import { CurrentWeekVsBudget } from './CurrentWeekVsBudget'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const WorkBudgetReport = () => {
  return (
    <Panel kind="secondary">
      <SeparatedByLine gap={40}>
        <CurrentWeekVsBudget />
        <WorkBudgetDaysReport />
        <WorkBudgetWeeksReport />
      </SeparatedByLine>
    </Panel>
  )
}
