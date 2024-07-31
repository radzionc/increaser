import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { Tasks } from '@increaser/ui/tasks/Tasks'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageHeader } from '../ui/page/PageHeader'
import { PageTitle } from '../ui/page/PageTitle'
import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { ProjectFilter } from '@increaser/ui/projects/filter/ProjectFilter'

const title = 'Tasks'

const contentWidth = 560

export const TasksPage: Page = () => {
  return (
    <PageContainer>
      <PageContent style={{ maxWidth: contentWidth }}>
        <PageHeader>
          <PageTitle>{title}</PageTitle>
          <PageDocumentTitle emoji="✅" title={title} />
          <ClientOnly>
            <UserStateOnly>
              <ProjectFilter />
            </UserStateOnly>
          </ClientOnly>
        </PageHeader>
        <UserStateOnly>
          <Tasks />
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
