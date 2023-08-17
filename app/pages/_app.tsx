import type { AppProps } from 'next/app'
import { GlobalStyle } from '@increaser/ui/ui/GlobalStyle'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { trackEvent } from 'analytics'
import { useDev } from 'components/layout/useDev'
import { ErrorBoundary } from '@sentry/nextjs'
import { getQueryClient } from 'api/queryClient'
import { AuthProvider } from 'auth/components/AuthProvider'
import { BreakProvider } from 'break/components/BreakProvider'
import { FullSizeErrorFallback } from 'errors/components/FullSizeErrorFallback'
import { FocusProvider } from 'focus/components/FocusProvider'
import { HabitsProvider } from 'habits/components/HabitsProvider'
import { ProjectsProvider } from 'projects/components/ProjectsProvider'
import { PWAProvider } from 'pwa/components/PWAProvider'
import { QueryClientProvider } from 'react-query'
import { Retro } from 'retro/components/Retro'
import { SetsManagerProvider } from 'sets/components/SetsManagerProvider'
import { ConditionalUserState } from 'user/components/ConditionalUserState'
import { UserManagerProvider } from 'user/components/UserManagerProvider'
import { UserStateProvider } from 'user/components/UserStateProvider'
import { MembershipProvider } from 'membership/components/MembershipProvider'
import { ThemeProvider } from 'ui/ThemeProvider'
import { PresentationProvider } from 'ui/PresentationProvider'

import { Open_Sans } from 'next/font/google'
import { Page } from 'components/Page'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
})

type MyAppProps = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  useDev()

  const [queryClient] = useState(getQueryClient)

  const router = useRouter()
  const { pathname } = router
  useEffect(() => {
    console.log('Visit page: ', pathname)
    trackEvent('Visit page', { pathname })
  }, [pathname])

  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  return (
    <ThemeProvider>
      <GlobalStyle fontFamily={openSans.style.fontFamily} />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<FullSizeErrorFallback />}>
          <AuthProvider>
            <UserStateProvider>
              <PresentationProvider>
                <PWAProvider>
                  <ConditionalUserState
                    present={() => (
                      <MembershipProvider>
                        <UserManagerProvider>
                          <ProjectsProvider>
                            <HabitsProvider>
                              <SetsManagerProvider>
                                <FocusProvider>
                                  <Retro />
                                  <BreakProvider>{component}</BreakProvider>
                                </FocusProvider>
                              </SetsManagerProvider>
                            </HabitsProvider>
                          </ProjectsProvider>
                        </UserManagerProvider>
                      </MembershipProvider>
                    )}
                    missing={() => <>{component}</>}
                  />
                </PWAProvider>
              </PresentationProvider>
            </UserStateProvider>
          </AuthProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
