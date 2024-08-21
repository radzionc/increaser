import { ErrorBoundary } from '@increaser/app/errors/components/ErrorBoundary'
import { ErrorFallbackCard } from '@increaser/app/errors/components/ErrorFallbackCard'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { HomePageContent } from './HomePageContent'
import { Page } from '@lib/next-ui/Page'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { productName } from '@increaser/config'
import { PageContainer } from '../../ui/page/PageContainer'
import { PageContent } from '../../ui/page/PageContent'

export const HomePage: Page = () => {
  return (
    <PageContainer style={{ flex: 1 }}>
      <PageContent>
        <PageMetaTags title={`🏠 Overview | ${productName}`} />
        <UserStateOnly>
          <ErrorBoundary fallback={<ErrorFallbackCard />}>
            <HomePageContent />
          </ErrorBoundary>
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
