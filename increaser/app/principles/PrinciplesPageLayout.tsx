import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../ui/page/AppPageLayout'
import { PageContainer } from '../ui/page/PageContainer'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'
import { PageContent } from '../ui/page/PageContent'
import { PageHeaderControlsAreaProvider } from '../ui/page/header/PageHeaderControlsAreaProvider'

export const PrinciplesPageLayout = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer>
        <PageContent>
          <PageHeaderControlsAreaProvider>
            <PageHeader>
              <PagePrimaryNavigation />
            </PageHeader>
            {children}
          </PageHeaderControlsAreaProvider>
        </PageContent>
      </PageContainer>
    </AppPageLayout>
  )
}
