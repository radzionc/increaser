import { ChildrenProp } from '@lib/ui/props'

import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'
import { AppPageLayout } from '../ui/page/AppPageLayout'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PageHeaderControlsAreaProvider } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'

export const PrinciplesPageLayout = ({ children }: ChildrenProp) => {
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
