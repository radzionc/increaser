import { Page } from '@lib/next-ui/Page'
import { Ideas } from '@increaser/ui/ideas/Ideas'
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
            <>
              <ManageProjectFilter />
              <AddIdea />
            </>
          }
        >
          <PagePrimaryNavigation />
        </PageHeader>
        <Ideas />
      </PageContent>
    </PageContainer>
  )
}
