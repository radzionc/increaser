import { PagePrimaryNavigation } from '@increaser/app/navigation/page/PagePrimaryNavigation'
import { PageHeader } from '@increaser/app/ui/page/header/PageHeader'
import { PageHeaderControlsAreaProvider } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { ChildrenProp } from '@lib/ui/props'
import { AppPageLayout } from './AppPageLayout'

export const RegularAppPageLayout = ({ children }: ChildrenProp) => {
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
