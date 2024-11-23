import { withLayout } from '@lib/next-ui/utils/withLayout'
import { RegularAppPageLayout } from '../ui/page/RegularAppPageLayout'
import { ManageWorkPreferences } from '@increaser/ui/preferences/ManageWorkPreferences'

export default withLayout({
  page: ManageWorkPreferences,
  layout: RegularAppPageLayout,
})
