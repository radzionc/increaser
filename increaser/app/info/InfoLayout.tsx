import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'

import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../ui/page/AppPageLayout'
import { PageHeaderControlsAreaProvider } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { PageViewNavigation } from '../navigation/page/PageViewNavigation'
import { PageHeader } from '../ui/page/header/PageHeader'
import { appPageEmoji } from '@increaser/ui/navigation/app'

const title = 'Knowledge Base'

export const InfoLayout = ({ children }: ComponentWithChildrenProps) => {
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
