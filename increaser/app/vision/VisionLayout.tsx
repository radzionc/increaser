import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { PageTitle } from '../ui/PageTitle'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageViewNavigation } from '../navigation/page/PageViewNavigation'

const title = 'Vision'

export const VisionLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <FixedWidthContent>
        <PageTitle
          documentTitle={`⏳ ${title}`}
          title={<PageViewNavigation />}
        />
        <UserStateOnly>{children}</UserStateOnly>
      </FixedWidthContent>
    </AppPageLayout>
  )
}
