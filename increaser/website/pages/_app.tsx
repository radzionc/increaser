import type { AppProps } from 'next/app'
import { ReactNode, useState } from 'react'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Open_Sans } from 'next/font/google'
import { ThemePreference } from '@lib/ui/theme/ThemePreference'
import { ThemeProvider } from '@lib/ui/theme/ThemeProvider'
import {
  usePersistentState,
  PersistentStateKey,
} from '../state/persistentState'
import { Page } from '@lib/next-ui/Page'

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
