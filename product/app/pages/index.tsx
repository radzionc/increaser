import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HomePage } from '@product/app/home/components'

import { AppPageLayout } from '../ui/page/AppPageLayout'

export default withLayout({
  page: HomePage,
  layout: AppPageLayout,
})
