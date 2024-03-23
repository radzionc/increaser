import { Panel } from '@lib/ui/panel/Panel'
import { WorkBudgetDaysReport } from './WorkBudgetDaysReport'
import { WorkBudgetWeeksReport } from './WorkBudgetWeeksReport'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const WorkBudgetReport = () => {
  return (
    <Panel kind="secondary">
      <SeparatedByLine gap={40}>
        <WorkBudgetDaysReport />
        <WorkBudgetWeeksReport />
      </SeparatedByLine>
    </Panel>
  )
}
