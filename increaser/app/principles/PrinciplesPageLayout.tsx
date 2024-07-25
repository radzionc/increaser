import { ComponentWithChildrenProps } from '@lib/ui/props'
import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { PageTitle } from '../ui/PageTitle'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { PrinciplesViewSelector } from './PrinciplesViewSelector'

export const PrinciplesPageLayout = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <FixedWidthContent>
        <PageTitle
          documentTitle={`📜 Principles`}
          title={<PrinciplesViewSelector />}
        />
        <UserStateOnly>{children}</UserStateOnly>
      </FixedWidthContent>
    </AppPageLayout>
  )
}
