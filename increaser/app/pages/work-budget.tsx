import { WorkBudgetPage } from '../workBudget/WorkBudgetPage'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'

export default withLayout({
  page: WorkBudgetPage,
  layout: AppPageLayout,
})
