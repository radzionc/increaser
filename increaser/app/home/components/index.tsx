import { ErrorBoundary } from '@sentry/nextjs'
import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { ErrorFallbackCard } from '@increaser/app/errors/components/ErrorFallbackCard'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { HomePageContent } from './HomePageContent'
import { Page } from '@lib/next-ui/Page'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { productName } from '@increaser/config'
import { RequiresOnboarding } from '../../onboarding/RequiresOnboarding'

export const HomePage: Page = () => {
  return (
    <FixedWidthContent style={{ display: 'flex', flexDirection: 'column' }}>
      <PageMetaTags title={`🏠 Overview | ${productName}`} />
      <UserStateOnly>
        <RequiresOnboarding>
          <ErrorBoundary fallback={<ErrorFallbackCard />}>
            <HomePageContent />
          </ErrorBoundary>
        </RequiresOnboarding>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
