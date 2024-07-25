import { ProjectsBudgetPage } from '../projects/budget/ProjectsBudgetPage'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'

export default withLayout({
  page: ProjectsBudgetPage,
  layout: AppPageLayout,
})
