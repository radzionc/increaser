import { withLayout } from '@lib/next-ui/utils/withLayout'
import { IdeasPage } from '../ideas/IdeasPage'
import { AppPageLayout } from '../focus/components/AppPageLayout'

export default withLayout({
  page: IdeasPage,
  layout: AppPageLayout,
})
