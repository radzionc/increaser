import { ChildrenProp } from '@lib/ui/props'
import { ManageProjectFilter } from '@product/ui/projects/filter/project/ManageProjectFilter'

import { PageViewNavigation } from '../navigation/page/PageViewNavigation'
import { AppPageLayout } from '../ui/page/AppPageLayout'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PageHeaderControlsAreaProvider } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'

const title = 'Tasks'

export const TasksLayout = ({ children }: ChildrenProp) => {
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
