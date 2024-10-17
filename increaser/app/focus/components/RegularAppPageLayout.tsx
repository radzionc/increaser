import { AppPageLayout } from '@increaser/app/focus/components/AppPageLayout'
import { PagePrimaryNavigation } from '@increaser/app/navigation/page/PagePrimaryNavigation'
import { PageHeader } from '@increaser/app/ui/page/header/PageHeader'
import { PageHeaderControlsAreaProvider } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { ComponentWithChildrenProps } from '@lib/ui/props'

export const RegularAppPageLayout = ({
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
