import { ChildrenProp } from '@lib/ui/props'
import { appPageEmoji } from '@product/ui/navigation/app'

import { PageViewNavigation } from '../navigation/page/PageViewNavigation'
import { AppPageLayout } from '../ui/page/AppPageLayout'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PageHeaderControlsAreaProvider } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'

const title = 'Knowledge Base'

export const InfoLayout = ({ children }: ChildrenProp) => {
  return (
    <AppPageLayout>
      <PageContainer>
        <PageContent>
          <PageHeaderControlsAreaProvider>
            <PageHeader>
              <PageViewNavigation />
            </PageHeader>
            <PageDocumentTitle emoji={appPageEmoji.info} title={title} />
            {children}
          </PageHeaderControlsAreaProvider>
        </PageContent>
      </PageContainer>
    </AppPageLayout>
  )
}
