import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { PageContainer } from '../ui/page/PageContainer'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'
import { PageContent } from '../ui/page/PageContent'

export const PrinciplesPageLayout = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer>
        <PageContent>
          <PageHeader>
            <PagePrimaryNavigation />
          </PageHeader>
          <UserStateOnly>{children}</UserStateOnly>
        </PageContent>
      </PageContainer>
    </AppPageLayout>
  )
}
