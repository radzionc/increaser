import { Page } from '@lib/next-ui/Page'
import { PageContainer } from '@product/app/ui/page/PageContainer'
import { PageContent } from '@product/app/ui/page/PageContent'
import { ProductUpdates } from '@product/ui/changelog/ProductUpdates'

import { PagePrimaryNavigation } from '../navigation/page/PagePrimaryNavigation'
import { PageHeader } from '../ui/page/header/PageHeader'

export const ProductUpdatesPage: Page = () => {
  return (
    <PageContainer>
      <PageContent>
        <PageHeader>
          <PagePrimaryNavigation />
        </PageHeader>
        <ProductUpdates />
      </PageContent>
    </PageContainer>
  )
}
