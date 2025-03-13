import { PageVisitTracker } from '@lib/next-analytics-ui/PageVisitTracker'
import { Page } from '@lib/next-ui/Page'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { darkTheme } from '@lib/ui/theme/darkTheme'
import { ThemeProvider } from '@lib/ui/theme/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Open_Sans } from 'next/font/google'
import { ReactNode, useState } from 'react'

import { AnalyticsProvider } from '../analytics/AnalyticsProvider'
import { WebsiteLayout } from '../layout/WebsiteLayout'

import type { AppProps } from 'next/app'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

interface MyAppProps extends AppProps {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient())

  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  return (
    <AnalyticsProvider>
      <PageVisitTracker />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle fontFamily={openSans.style.fontFamily} />
          <WebsiteLayout>{component}</WebsiteLayout>
        </ThemeProvider>
      </QueryClientProvider>
    </AnalyticsProvider>
  )
}

export default MyApp
