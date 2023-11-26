import type { AppProps } from 'next/app'
import { GlobalStyle } from '@increaser/ui/GlobalStyle'
import { ReactNode, useEffect } from 'react'

import { ThemeProvider } from 'ui/ThemeProvider'

import { Open_Sans } from 'next/font/google'
import { Page } from 'components/Page'
import { analytics } from 'analytics'
import { useRouter } from 'next/router'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
})

type MyAppProps = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  const router = useRouter()
  const { pathname } = router
  useEffect(() => {
    analytics.trackEvent('Visit page', { pathname })
  }, [pathname])

  return (
    <ThemeProvider>
      <GlobalStyle fontFamily={openSans.style.fontFamily} />
      {component}
    </ThemeProvider>
  )
}

export default MyApp
