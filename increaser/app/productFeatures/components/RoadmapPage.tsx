import { Page } from '@lib/next-ui/Page'

import { PageContainer } from '@increaser/app/ui/page/PageContainer'
import { PageContent } from '@increaser/app/ui/page/PageContent'
import { PageTitle } from '@increaser/app/ui/page/PageTitle'
import { PageDocumentTitle } from '@increaser/app/ui/page/PageDocumentTitle'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { ProductFeaturesBoard } from './ProductFeaturesBoard'

const title = `Roadmap`

export const RoadmapPage: Page = () => {
  return (
    <PageContainer>
      <PageContent>
        <PageTitle>{title}</PageTitle>
        <PageDocumentTitle emoji="" title={title} />
        <UserStateOnly>
          <ProductFeaturesBoard />
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
