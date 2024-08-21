import { Page } from '@lib/next-ui/Page'

import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'

import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { ProductUpdates } from '@increaser/ui/changelog/ProductUpdates'
import { PageHeader } from '../ui/page/header/PageHeader'
import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'

export const ProductUpdatesPage: Page = () => {
  return (
    <PageContainer>
      <PageContent>
        <PageHeader>
          <PagePrimaryNavigation />
        </PageHeader>
        <UserStateOnly>
          <ProductUpdates />
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
