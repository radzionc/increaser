import type { AppProps } from 'next/app'
import { GlobalStyle } from '@increaser/ui/ui/GlobalStyle'
import { ThemeMetaTags } from '@increaser/ui/ui/theme/ThemeMetaTags'
import { Path } from 'router/Path'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { trackEvent } from 'analytics'
import { useDev } from 'components/layout/useDev'
import { ErrorBoundary } from '@sentry/nextjs'
import { NetworkStateObserver } from 'api/components/NetworkStateObserver'
import { getQueryClient } from 'api/queryClient'
import { AuthFlowOverlayProvider } from 'auth/components/AuthFlow/AuthFlowOverlayProvider'
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
import { Navigation } from 'ui/Navigation'
import { ThemeProvider } from 'ui/ThemeProvider'
import { SnackbarProvider } from 'ui/Snackbar/SnackbarProvider'
import { PresentationProvider } from 'ui/PresentationProvider'

import { Open_Sans } from 'next/font/google'
import { Page } from 'components/Page'
import Head from 'next/head'

const pagesWithoutNavigation = [
  Path.Focus,
  Path.TermsOfService,
  Path.PrivacyPolicy,
  Path.Landing,
  Path.AppSumo,
]

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
    trackEvent('Visit page', { pathname })
  })

  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  const shouldHideNavigation = pagesWithoutNavigation.includes(pathname as Path)
  const content = shouldHideNavigation ? (
    component
  ) : (
    <Navigation>{component}</Navigation>
  )

  return (
    <ThemeProvider>
      <GlobalStyle fontFamily={openSans.style.fontFamily} />
      <Head>
        <ThemeMetaTags />
      </Head>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <ErrorBoundary fallback={<FullSizeErrorFallback />}>
            <NetworkStateObserver />
            <AuthProvider>
              <UserStateProvider>
                <AuthFlowOverlayProvider>
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
                                      <BreakProvider>{content}</BreakProvider>
                                    </FocusProvider>
                                  </SetsManagerProvider>
                                </HabitsProvider>
                              </ProjectsProvider>
                            </UserManagerProvider>
                          </MembershipProvider>
                        )}
                        missing={() => content}
                      />
                    </PWAProvider>
                  </PresentationProvider>
                </AuthFlowOverlayProvider>
              </UserStateProvider>
            </AuthProvider>
          </ErrorBoundary>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
