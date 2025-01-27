import { withLayout } from '@lib/next-ui/utils/withLayout'
import { RegularAppPageLayout } from '../ui/page/RegularAppPageLayout'
import { ManagePreferences } from '@increaser/ui/preferences/ManagePreferences'

export default withLayout({
  page: ManagePreferences,
  layout: RegularAppPageLayout,
})
