import { CommunityPage } from 'community/components/CommunityPage'
import { AppPageLayout } from 'focus/components/AppPageLayout'

export default CommunityPage

CommunityPage.getLayout = function getLayout(page) {
  return <AppPageLayout>{page}</AppPageLayout>
}
