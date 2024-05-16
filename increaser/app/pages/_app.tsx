import type { AppProps } from 'next/app'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { analytics } from '@increaser/app/analytics'
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
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { ThemePreference } from '@lib/ui/theme/ThemePreference'
import { ThemeProvider } from '@lib/ui/theme/ThemeProvider'
import { ScheduleProvider } from '../sets/components/ScheduleProvider'
import { FocusLauncherProvider } from '../focus/launcher/FocusLauncherProvider'
import { FocusSoundsPlayer } from '../focus/audio/sounds/FocusSoundsPlayer'
import { ApiProvider } from '../api/ApiProvider'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
})

type MyAppProps = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(getQueryClient)
  const [theme, setTheme] = usePersistentState<ThemePreference>(
    PersistentStateKey.ThemePreference,
    'dark',
  )

  const router = useRouter()
  const { pathname } = router
  useEffect(() => {
    analytics.trackEvent('Visit page', { pathname })
  }, [pathname])

  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  return (
    <ThemeProvider value={theme} onChange={setTheme}>
      <GlobalStyle fontFamily={openSans.style.fontFamily} />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<FullSizeErrorFallback />}>
          <ApiProvider>
            <UserStateProvider>
              <FocusLauncherProvider>
                <PWAProvider>
                  <ConditionalUserState
                    present={() => (
                      <UserManagerProvider>
                        <HabitsProvider>
                          <FocusProvider>
                            <ScheduleProvider>
                              <BreakProvider>
                                <FocusSoundsPlayer />
                                {component}
                              </BreakProvider>
                              <MembershipConfirmation />
                            </ScheduleProvider>
                          </FocusProvider>
                        </HabitsProvider>
                      </UserManagerProvider>
                    )}
                    missing={() => <>{component}</>}
                  />
                </PWAProvider>
              </FocusLauncherProvider>
            </UserStateProvider>
          </ApiProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
