import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { FeaturesViewSelector } from './FeaturesViewSelector'
import { UserStateOnly } from '../user/state/UserStateOnly'

export const FeaturesLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <FixedWidthContent>
        <PageTitle
          documentTitle={`🎁 Features`}
          title={<FeaturesViewSelector />}
        />
        <UserStateOnly>{children}</UserStateOnly>
      </FixedWidthContent>
    </AppPageLayout>
  )
}
