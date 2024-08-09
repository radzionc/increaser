import { Page } from '@lib/next-ui/Page'
import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { WorkBudgetReport } from '@increaser/ui/workBudget/WorkBudgetReport'

export const WorkBudget: Page = () => {
  return (
    <UniformColumnGrid
      style={{ alignItems: 'start' }}
      fullWidth
      minChildrenWidth={320}
      gap={40}
    >
      <ManageWorkBudget />
      <WorkBudgetReport />
    </UniformColumnGrid>
  )
}
