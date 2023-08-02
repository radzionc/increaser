import { CapacityPage } from 'capacity/components/CapacityPage'
import { AppPageLayout } from 'focus/components/AppPageLayout'

export default CapacityPage

CapacityPage.getLayout = function getLayout(page) {
  return <AppPageLayout>{page}</AppPageLayout>
}
