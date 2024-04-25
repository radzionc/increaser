import { Panel } from '@lib/ui/panel/Panel'
import { WorkBudgetDaysReport } from './WorkBudgetDaysReport'
import { WorkBudgetWeeksReport } from './WorkBudgetWeeksReport'
import { CurrentWeekVsBudget } from './CurrentWeekVsBudget'

export const WorkBudgetReport = () => {
  return (
    <Panel withSections kind="secondary">
      <CurrentWeekVsBudget />
      <WorkBudgetDaysReport />
      <WorkBudgetWeeksReport />
    </Panel>
  )
}
