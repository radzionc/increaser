import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { Page } from '@lib/next-ui/Page'
import { productName } from '@product/config'
import { ErrorBoundary } from '@product/ui/errors/components/ErrorBoundary'
import { ErrorFallbackCard } from '@product/ui/errors/components/ErrorFallbackCard'

import { PageContainer } from '../../ui/page/PageContainer'
import { PageContent } from '../../ui/page/PageContent'

import { HomePageContent } from './HomePageContent'

export const HomePage: Page = () => {
  return (
    <PageContainer style={{ flex: 1 }}>
      <PageContent>
        <PageMetaTags title={`🏠 Overview | ${productName}`} />
        <ErrorBoundary fallback={<ErrorFallbackCard />}>
          <HomePageContent />
        </ErrorBoundary>
      </PageContent>
    </PageContainer>
  )
}
