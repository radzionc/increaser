import { PageTitle } from '@lib/ui/text/PageTitle'

import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { Ideas } from '@increaser/ui/ideas/Ideas'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'
import { Header } from '@lib/ui/layout/Header'

import { ManageProjectFilter } from '@increaser/ui/projects/filter/ManageProjectFilter'
import { ProjectFilterProvider } from '@increaser/ui/projects/filter/ProjectFilterProvider'

const title = 'Ideas'
const contentWidth = 560

export const IdeasPage: Page = () => {
  return (
    <PageContainer>
      <PageContent style={{ maxWidth: contentWidth }}>
        <ProjectFilterProvider initialValue={null}>
          <Header>
            <PageTitle>{title}</PageTitle>
            <PageDocumentTitle emoji="💡" title={title} />
            <ClientOnly>
              <UserStateOnly>
                <ManageProjectFilter />
              </UserStateOnly>
            </ClientOnly>
          </Header>
          <UserStateOnly>
            <Ideas />
          </UserStateOnly>
        </ProjectFilterProvider>
      </PageContent>
    </PageContainer>
  )
}
