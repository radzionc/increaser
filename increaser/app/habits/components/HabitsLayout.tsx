import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../../focus/components/AppPageLayout'
import { PageTitle } from '../../ui/PageTitle'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { FixedWidthContent } from '../../components/reusable/fixed-width-content'
import { HabitsViewSelector } from './HabitsViewSelector'

export const HabitsLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <FixedWidthContent>
        <PageTitle documentTitle={`🧘‍♀️ Habits`} title={<HabitsViewSelector />} />
        <UserStateOnly>{children}</UserStateOnly>
      </FixedWidthContent>
    </AppPageLayout>
  )
}
