import { UserStateOnly } from '../user/state/UserStateOnly'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'

import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { ProjectFilterProvider } from '@increaser/ui/projects/filter/ProjectFilterProvider'
import { TaskStatusFilterProvider } from '@increaser/ui/tasks/status/TaskStatusFilter'
import { TasksHeader } from './TasksHeader'

const title = 'Tasks'

export const TasksLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer style={{ flex: 1, maxWidth: 1200 }}>
        <PageContent>
          <TaskStatusFilterProvider initialValue="todo">
            <ProjectFilterProvider initialValue={null}>
              <TasksHeader />
              <PageDocumentTitle emoji="✅" title={title} />
              <UserStateOnly>{children}</UserStateOnly>
            </ProjectFilterProvider>
          </TaskStatusFilterProvider>
        </PageContent>
      </PageContainer>
    </AppPageLayout>
  )
}
