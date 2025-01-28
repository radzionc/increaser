import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'

import { ChildrenProp } from '@lib/ui/props'
import { AppPageLayout } from '../ui/page/AppPageLayout'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PageHeaderControlsAreaProvider } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'

export const GoalsLayout = ({ children }: ChildrenProp) => {
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
