import { AppPageLayout } from 'focus/components/AppPageLayout'
import { SettingsPage } from 'settings/components'

export default SettingsPage

SettingsPage.getLayout = function getLayout(page) {
  return <AppPageLayout>{page}</AppPageLayout>
}
