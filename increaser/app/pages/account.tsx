import { SettingsPage } from '@increaser/app/settings/components'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'

export default withLayout({
  page: SettingsPage,
  layout: AppPageLayout,
})
