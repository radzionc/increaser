import type { AppProps } from 'next/app'
import { GlobalStyle } from '@increaser/ui/css/GlobalStyle'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { analytics } from 'analytics'
import { ErrorBoundary } from '@sentry/nextjs'
import { getQueryClient } from 'query/queryClient'
import { BreakProvider } from 'break/components/BreakProvider'
import { FullSizeErrorFallback } from 'errors/components/FullSizeErrorFallback'
import { FocusProvider } from 'focus/components/FocusProvider'
import { HabitsProvider } from 'habits/components/HabitsProvider'
import { ProjectsProvider } from 'projects/components/ProjectsProvider'
import { PWAProvider } from 'pwa/components/PWAProvider'
import { QueryClientProvider } from 'react-query'
import { ConditionalUserState } from 'user/components/ConditionalUserState'
import { UserManagerProvider } from 'user/components/UserManagerProvider'
import { UserStateProvider } from 'user/components/UserStateProvider'
import { ThemeProvider } from 'ui/ThemeProvider'

import { Open_Sans } from 'next/font/google'
import { Page } from 'layout/Page'
import { MembershipConfirmation } from 'membership/components/MembershipConfirmation'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
})

type MyAppProps = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(getQueryClient)

  const router = useRouter()
  const { pathname } = router
  useEffect(() => {
    analytics.trackEvent('Visit page', { pathname })
  }, [pathname])

  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  return (
    <ThemeProvider>
      <GlobalStyle fontFamily={openSans.style.fontFamily} />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<FullSizeErrorFallback />}>
          <UserStateProvider>
            <PWAProvider>
              <ConditionalUserState
                present={() => (
                  <UserManagerProvider>
                    <ProjectsProvider>
                      <HabitsProvider>
                        <FocusProvider>
                          <BreakProvider>{component}</BreakProvider>
                          <MembershipConfirmation />
                        </FocusProvider>
                      </HabitsProvider>
                    </ProjectsProvider>
                  </UserManagerProvider>
                )}
                missing={() => <>{component}</>}
              />
            </PWAProvider>
          </UserStateProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
