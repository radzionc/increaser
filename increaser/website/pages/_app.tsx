import type { AppProps } from 'next/app'
import { ReactNode, useEffect, useState } from 'react'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Open_Sans } from 'next/font/google'
import { ThemePreference } from '@lib/ui/theme/ThemePreference'
import { ThemeProvider } from '@lib/ui/theme/ThemeProvider'
import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { Page } from '@lib/next-ui/Page'
import { useRouter } from 'next/router'
import { analytics } from '../analytics'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
})

interface MyAppProps extends AppProps {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient())

  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  const [theme, setTheme] = usePersistentState<ThemePreference>(
    PersistentStateKey.ThemePreference,
    'dark',
  )

  const { pathname } = useRouter()
  useEffect(() => {
    analytics.trackEvent('Visit page', { pathname })
  }, [pathname])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={theme} onChange={setTheme}>
        <GlobalStyle fontFamily={openSans.style.fontFamily} />
        {component}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
