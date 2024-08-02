import { PageTitle } from '@increaser/app/ui/page/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { Ideas } from '@increaser/ui/ideas/Ideas'
import { ProjectFilter } from '@increaser/ui/projects/filter/ProjectFilter'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'
import { PageHeader } from '../ui/page/PageHeader'

const title = 'Ideas'
const contentWidth = 560

export const IdeasPage: Page = () => {
  return (
    <PageContainer>
      <PageContent style={{ maxWidth: contentWidth }}>
        <PageHeader>
          <PageTitle>{title}</PageTitle>
          <PageDocumentTitle emoji="💡" title={title} />
          <ClientOnly>
            <UserStateOnly>
              <ProjectFilter />
            </UserStateOnly>
          </ClientOnly>
        </PageHeader>
        <UserStateOnly>
          <Ideas />
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
