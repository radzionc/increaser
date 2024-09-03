import { Page } from '@lib/next-ui/Page'
import { ProjectsBudgetOverview } from './ProjectsBudgetOverview'
import { VStack } from '@lib/ui/css/stack'
import { ManageTimePrompt } from './ManageTimePrompt'
import { ProjectsBudgetList } from './ProjectsBudgetList'

export const ManageProjectsBudget: Page = () => {
  return (
    <VStack gap={24} style={{ maxWidth: 480 }}>
      <ProjectsBudgetOverview />
      <ManageTimePrompt />
      <ProjectsBudgetList />
    </VStack>
  )
}
