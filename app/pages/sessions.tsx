import { AppPageLayout } from 'focus/components/AppPageLayout'
import { SessionsPage } from 'sets/components'

export default SessionsPage

SessionsPage.getLayout = function getLayout(page) {
  return <AppPageLayout>{page}</AppPageLayout>
}
