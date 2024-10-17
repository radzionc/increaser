import { Panel } from '@lib/ui/css/panel'
import { useWorkBudgetTotal } from '../../workBudget/hooks/useWorkBudgetTotal'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { Statistic } from '@lib/ui/layout/Statistic'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { useProjectsBudgetedHours } from './hooks/useProjectsBudgetedHours'

export const BudgetOverview = () => {
  const workBudgetTotal = useWorkBudgetTotal()

  const budgetedHours = useProjectsBudgetedHours()

  return (
    <UniformColumnGrid minChildrenWidth={100} gap={20}>
      <Panel>
        <Statistic
          title="Work Budget"
          value={
            <EmphasizeNumbers
              value={formatDuration(workBudgetTotal, 'h', { maxUnit: 'h' })}
            />
          }
        />
      </Panel>
      <Panel>
        <Statistic
          title="Allocated"
          value={
            <EmphasizeNumbers
              value={formatDuration(budgetedHours, 'h', { maxUnit: 'h' })}
            />
          }
        />
      </Panel>
    </UniformColumnGrid>
  )
}
