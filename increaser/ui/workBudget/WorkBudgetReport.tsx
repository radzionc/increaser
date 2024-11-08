import { Panel } from '@lib/ui/css/panel'
import { CurrentWeekVsBudget } from './CurrentWeekVsBudget'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const WorkBudgetReport = () => {
  return (
    <Panel kind="secondary">
      <SeparatedByLine gap={40}>
        <CurrentWeekVsBudget />
      </SeparatedByLine>
    </Panel>
  )
}
