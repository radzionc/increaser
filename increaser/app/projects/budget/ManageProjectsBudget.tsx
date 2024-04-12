import { Page } from '@lib/next-ui/Page'
import { ProjectsBudgetOverview } from './ProjectsBudgetOverview'
import { VStack } from '@lib/ui/layout/Stack'
import { BudgetFreeTimePrompt } from './BudgetFreeTimePrompt'
import { ProjectsBudgetList } from './ProjectsBudgetList'

export const ManageProjectsBudget: Page = () => {
  return (
    <VStack gap={24} style={{ maxWidth: 480 }}>
      <ProjectsBudgetOverview />
      <BudgetFreeTimePrompt />
      <ProjectsBudgetList />
    </VStack>
  )
}
