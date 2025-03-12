import { Page } from '@lib/next-ui/Page'
import { PageVisitTracker } from '@lib/next-ui/PageVisitTracker'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { darkTheme } from '@lib/ui/theme/darkTheme'
import { ThemeProvider } from '@lib/ui/theme/ThemeProvider'
import { PWAProvider } from '@product/app/pwa/components/PWAProvider'
import { getQueryClient } from '@product/app/query/queryClient'
import { BreakManager } from '@product/ui/break/BreakManager'
import { ErrorBoundary } from '@product/ui/errors/components/ErrorBoundary'
import { FullSizeErrorFallback } from '@product/ui/errors/components/FullSizeErrorFallback'
import { YouTubeFocusMusicProvider } from '@product/ui/focus/audio/youTube/YouTubeFocusMusicProvider'
import { FocusManager } from '@product/ui/focus/FocusManager'
import { UserManager } from '@product/ui/user/UserManager'
import { UserStateOnly } from '@product/ui/user/UserStateOnly'
import { QueryClientProvider } from '@tanstack/react-query'
import { Open_Sans } from 'next/font/google'
import { ReactNode, useState } from 'react'

import { AnalyticsProvider } from '../analytics/AnalyticsProvider'
import { ApiProvider } from '../api/ApiProvider'
import { AuthenticatedOnly } from '../auth/components/AuthenticatedOnly'

import type { AppProps } from 'next/app'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
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
                    <UserStateOnly>
                      <FocusManager />
                      <BreakManager />
                    </UserStateOnly>
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
