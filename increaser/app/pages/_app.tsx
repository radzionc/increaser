import type { AppProps } from 'next/app'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { ReactNode, useState } from 'react'
import { ErrorBoundary } from '@increaser/ui/errors/components/ErrorBoundary'
import { getQueryClient } from '@increaser/app/query/queryClient'
import { FullSizeErrorFallback } from '@increaser/ui/errors/components/FullSizeErrorFallback'
import { PWAProvider } from '@increaser/app/pwa/components/PWAProvider'
import { QueryClientProvider } from '@tanstack/react-query'

import { Open_Sans } from 'next/font/google'
import { Page } from '@lib/next-ui/Page'
import { ThemeProvider } from '@lib/ui/theme/ThemeProvider'
import { ApiProvider } from '../api/ApiProvider'
import { YouTubeFocusMusicProvider } from '../focus/audio/youTube/YouTubeFocusMusicProvider'
import { AnalyticsProvider } from '../analytics/AnalyticsProvider'
import { PageVisitTracker } from '@lib/next-ui/PageVisitTracker'
import { darkTheme } from '@lib/ui/theme/darkTheme'
import { AuthenticatedOnly } from '../auth/components/AuthenticatedOnly'
import { UserManager } from '@increaser/ui/user/UserManager'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
})

type MyAppProps = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(getQueryClient)

  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  return (
    <AnalyticsProvider>
      <PageVisitTracker />
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle fontFamily={openSans.style.fontFamily} />
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<FullSizeErrorFallback />}>
            <ApiProvider>
              <PWAProvider>
                <YouTubeFocusMusicProvider>
                  <AuthenticatedOnly>
                    <UserManager />
                  </AuthenticatedOnly>
                  {component}
                </YouTubeFocusMusicProvider>
              </PWAProvider>
            </ApiProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  )
}

export default MyApp
