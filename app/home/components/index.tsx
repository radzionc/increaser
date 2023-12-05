import { ErrorBoundary } from '@sentry/nextjs'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import { UserStateOnly } from 'user/state/UserStateOnly'

import { HomePageContent } from './HomePageContent'
import { Page } from 'layout/Page'
import { PageMetaTags } from '@increaser/ui/metadata/PageMetaTags'
import { productName } from '@increaser/entities'

export const HomePage: Page = () => {
  return (
    <FixedWidthContent style={{ display: 'flex', flexDirection: 'column' }}>
      <PageMetaTags title={`🏠 Overview | ${productName}`} />
      <UserStateOnly>
        <ErrorBoundary fallback={<ErrorFallbackCard />}>
          <HomePageContent />
        </ErrorBoundary>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
