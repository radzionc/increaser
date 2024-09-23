import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { Ideas } from '@increaser/ui/ideas/Ideas'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'

import { PageHeader } from '../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'
import { AddIdea } from '@increaser/ui/ideas/AddIdea'
import { ManageProjectFilter } from '@increaser/ui/projects/filter/project/ManageProjectFilter'

export const IdeasPage: Page = () => {
  return (
    <PageContainer>
      <PageContent>
        <PageHeader
          controls={
            <ClientOnly>
              <UserStateOnly>
                <ManageProjectFilter />
                <AddIdea />
              </UserStateOnly>
            </ClientOnly>
          }
        >
          <PagePrimaryNavigation />
        </PageHeader>
        <UserStateOnly>
          <Ideas />
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
