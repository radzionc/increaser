import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { PageTitle } from '../ui/PageTitle'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { VisionViewSelector } from './VisionViewSelector'
import { FixedWidthContent } from '../components/reusable/fixed-width-content'

const title = 'Vision'

export const VisionLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <FixedWidthContent>
        <PageTitle
          documentTitle={`⏳ ${title}`}
          title={<VisionViewSelector />}
        />
        <UserStateOnly>{children}</UserStateOnly>
      </FixedWidthContent>
    </AppPageLayout>
  )
}
