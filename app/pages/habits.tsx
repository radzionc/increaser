import { AppPageLayout } from 'focus/components/AppPageLayout'
import { HabitsPage } from 'habits/components'

export default HabitsPage

HabitsPage.getLayout = function getLayout(page) {
  return <AppPageLayout>{page}</AppPageLayout>
}
