import { HomePage } from '@increaser/app/home/components'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../ui/page/AppPageLayout'

export default withLayout({
  page: HomePage,
  layout: AppPageLayout,
})
