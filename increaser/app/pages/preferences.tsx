import { withLayout } from '@lib/next-ui/utils/withLayout'
import { PreferencesPage } from '../preferences/PreferencesPage'
import { RegularAppPageLayout } from '../focus/components/RegularAppPageLayout'

export default withLayout({
  page: PreferencesPage,
  layout: RegularAppPageLayout,
})
