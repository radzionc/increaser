import { UserStateOnly } from '../user/state/UserStateOnly'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageTitle } from '@lib/ui/text/PageTitle'

import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { ProjectsViewSelector } from './ProjectsViewSelector'

const title = 'Projects'

export const ProjectsLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer>
        <PageContent>
          <PageTitle as="div">
            <ProjectsViewSelector />
          </PageTitle>
          <PageDocumentTitle emoji="📦" title={title} />
          <UserStateOnly>{children}</UserStateOnly>
        </PageContent>
      </PageContainer>
    </AppPageLayout>
  )
}
