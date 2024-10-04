import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'

import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'

export const PreferencesLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer>
        <PageContent>
          <PageHeader>
            <PagePrimaryNavigation />
          </PageHeader>
          {children}
        </PageContent>
      </PageContainer>
    </AppPageLayout>
  )
}
