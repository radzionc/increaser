import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../../focus/components/AppPageLayout'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { PageHeader } from '../../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../../navigation/page/PagePrimaryNavigation'
import { PageContainer } from '../../ui/page/PageContainer'
import { PageContent } from '../../ui/page/PageContent'
import { PageHeaderControlsAreaProvider } from '../../ui/page/header/PageHeaderControlsAreaProvider'

export const HabitsLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer>
        <PageContent>
          <PageHeaderControlsAreaProvider>
            <PageHeader>
              <PagePrimaryNavigation />
            </PageHeader>
            <UserStateOnly>{children}</UserStateOnly>
          </PageHeaderControlsAreaProvider>
        </PageContent>
      </PageContainer>
    </AppPageLayout>
  )
}
