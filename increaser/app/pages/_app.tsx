import type { AppProps } from 'next/app'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { ReactNode, useState } from 'react'
import { ErrorBoundary } from '@sentry/nextjs'
import { getQueryClient } from '@increaser/app/query/queryClient'
import { BreakProvider } from '@increaser/app/break/components/BreakProvider'
import { FullSizeErrorFallback } from '@increaser/app/errors/components/FullSizeErrorFallback'
import { FocusProvider } from '@increaser/app/focus/components/FocusProvider'
import { HabitsProvider } from '@increaser/app/habits/components/HabitsProvider'
import { PWAProvider } from '@increaser/app/pwa/components/PWAProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { ConditionalUserState } from '@increaser/app/user/components/ConditionalUserState'
import { UserManagerProvider } from '@increaser/app/user/components/UserManagerProvider'
import { UserStateProvider } from '@increaser/app/user/components/UserStateProvider'

import { Open_Sans } from 'next/font/google'
import { Page } from '@lib/next-ui/Page'
import { MembershipConfirmation } from '@increaser/app/membership/components/MembershipConfirmation'
import { ThemeProvider } from '@lib/ui/theme/ThemeProvider'
import { ProjectsProvider } from '@increaser/ui/projects/ProjectsProvider'
import { ScheduleProvider } from '../sets/components/ScheduleProvider'
import { FocusLauncherProvider } from '../focus/launcher/FocusLauncherProvider'
import { FocusSoundsPlayer } from '../focus/audio/sounds/FocusSoundsPlayer'
import { ApiProvider } from '../api/ApiProvider'
import { YouTubeFocusMusicProvider } from '../focus/audio/youTube/YouTubeFocusMusicProvider'
import { YouTubeFocusMusicFloatingPlayer } from '../focus/audio/youTube/YouTubeFocusMusicFloatingPlayer'
import { AnalyticsProvider } from '../analytics/AnalyticsProvider'
import { PageVisitTracker } from '@lib/next-ui/PageVisitTracker'

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
      <ThemeProvider>
        <GlobalStyle fontFamily={openSans.style.fontFamily} />
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<FullSizeErrorFallback />}>
            <ApiProvider>
              <UserStateProvider>
                <FocusLauncherProvider>
                  <PWAProvider>
                    <YouTubeFocusMusicProvider>
                      <ConditionalUserState
                        present={() => (
                          <UserManagerProvider>
                            <ProjectsProvider>
                              <HabitsProvider>
                                <FocusProvider>
                                  <ScheduleProvider>
                                    <BreakProvider>
                                      <FocusSoundsPlayer />
                                      <YouTubeFocusMusicFloatingPlayer />
                                      {component}
                                    </BreakProvider>
                                    <MembershipConfirmation />
                                  </ScheduleProvider>
                                </FocusProvider>
                              </HabitsProvider>
                            </ProjectsProvider>
                          </UserManagerProvider>
                        )}
                        missing={() => <>{component}</>}
                      />
                    </YouTubeFocusMusicProvider>
                  </PWAProvider>
                </FocusLauncherProvider>
              </UserStateProvider>
            </ApiProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  )
}

export default MyApp
