import { AppPageLayout } from 'focus/components/AppPageLayout'
import { HomePage } from 'home/components'

export default HomePage

HomePage.getLayout = function getLayout(page) {
  return <AppPageLayout>{page}</AppPageLayout>
}
