import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'

import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { PageHeaderControlsAreaProvider } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { PageViewNavigation } from '../navigation/page/PageViewNavigation'
import { PageHeader } from '../ui/page/header/PageHeader'
import { ManageProjectFilter } from '@increaser/ui/projects/filter/project/ManageProjectFilter'

const title = 'Tasks'

export const TasksLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer style={{ flex: 1, maxWidth: 1200 }}>
        <PageContent>
          <PageHeaderControlsAreaProvider>
            <PageHeader controls={<ManageProjectFilter />}>
              <PageViewNavigation />
            </PageHeader>
            <PageDocumentTitle emoji="✅" title={title} />
            {children}
          </PageHeaderControlsAreaProvider>
        </PageContent>
      </PageContainer>
    </AppPageLayout>
  )
}
