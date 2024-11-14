import { withLayout } from '@lib/next-ui/utils/withLayout'
import { RegularAppPageLayout } from '../focus/components/RegularAppPageLayout'
import { ManageWorkPreferences } from '@increaser/ui/preferences/ManageWorkPreferences'

export default withLayout({
  page: ManageWorkPreferences,
  layout: RegularAppPageLayout,
})
