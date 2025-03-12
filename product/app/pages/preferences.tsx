import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ManagePreferences } from '@product/ui/preferences/ManagePreferences'

import { RegularAppPageLayout } from '../ui/page/RegularAppPageLayout'

export default withLayout({
  page: ManagePreferences,
  layout: RegularAppPageLayout,
})
