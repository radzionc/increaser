import type { AppProps } from 'next/app'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { ReactNode, useState } from 'react'
import { ErrorBoundary } from '@increaser/app/errors/components/ErrorBoundary'
import { getQueryClient } from '@increaser/app/query/queryClient'
import { BreakProvider } from '@increaser/app/break/components/BreakProvider'
import { FullSizeErrorFallback } from '@increaser/app/errors/components/FullSizeErrorFallback'
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
import { ScheduleProvider } from '../sets/components/ScheduleProvider'
import { ApiProvider } from '../api/ApiProvider'
import { YouTubeFocusMusicProvider } from '../focus/audio/youTube/YouTubeFocusMusicProvider'
import { AnalyticsProvider } from '../analytics/AnalyticsProvider'
import { PageVisitTracker } from '@lib/next-ui/PageVisitTracker'
import { darkTheme } from '@lib/ui/theme/darkTheme'
import { FocusIntervalsProvider } from '../focus/state/focusIntervals'
import { FocusManager } from '@increaser/ui/focus/FocusManager'

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
              <UserStateProvider>
                <PWAProvider>
                  <YouTubeFocusMusicProvider>
                    <ConditionalUserState
                      present={() => (
                        <>
                          <UserManagerProvider>
                            <HabitsProvider>
                              <ScheduleProvider>
                                <FocusIntervalsProvider>
                                  <BreakProvider>
                                    <FocusManager />
                                    {component}
                                  </BreakProvider>
                                </FocusIntervalsProvider>
                                <MembershipConfirmation />
                              </ScheduleProvider>
                            </HabitsProvider>
                          </UserManagerProvider>
                        </>
                      )}
                      missing={() => <>{component}</>}
                    />
                  </YouTubeFocusMusicProvider>
                </PWAProvider>
              </UserStateProvider>
            </ApiProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  )
}

export default MyApp
