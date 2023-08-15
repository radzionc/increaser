import { AppSumoPage } from 'components/AppSumo'
import { AppPageLayout } from 'focus/components/AppPageLayout'

export default AppSumoPage

AppSumoPage.getLayout = function getLayout(page) {
  return <AppPageLayout>{page}</AppPageLayout>
}
