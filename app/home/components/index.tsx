import { ErrorBoundary } from '@sentry/nextjs'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import { UserStateOnly } from 'user/state/UserStateOnly'

import { HomePageContent } from './HomePageContent'
import Head from 'next/head'
import { Page } from 'components/Page'

export const HomePage: Page = () => {
  return (
    <FixedWidthContent style={{ display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>🏠 Overview | Increaser</title>
      </Head>
      <UserStateOnly>
        <ErrorBoundary fallback={<ErrorFallbackCard />}>
          <HomePageContent />
        </ErrorBoundary>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
