import { ChildrenProp } from '@lib/ui/props'
import { PagePrimaryNavigation } from '@product/app/navigation/page/PagePrimaryNavigation'
import { PageHeader } from '@product/app/ui/page/header/PageHeader'
import { PageHeaderControlsAreaProvider } from '@product/app/ui/page/header/PageHeaderControlsAreaProvider'
import { PageContainer } from '@product/app/ui/page/PageContainer'
import { PageContent } from '@product/app/ui/page/PageContent'

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
