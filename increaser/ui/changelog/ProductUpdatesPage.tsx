import { Page } from '@lib/next-ui/Page'

import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { PageTitle } from '@increaser/app/ui/page/PageTitle'
import { PageDocumentTitle } from '@increaser/app/ui/page/PageDocumentTitle'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { ProductUpdates } from './ProductUpdates'

const title = `What's New`

export const ProductUpdatesPage: Page = () => {
  return (
    <PageContainer>
      <PageContent>
        <PageTitle>{title}</PageTitle>
        <PageDocumentTitle emoji="🎁" title={title} />
        <UserStateOnly>
          <ProductUpdates />
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
