import { useAuth } from 'auth/hooks/useAuth'
import { Page } from 'components/Page'
import { LandingPage as LandingPageContent } from 'landing/components'
import { WebsitePageLayout } from 'landing/components/WebsitePageLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Path } from 'router/Path'

export const LandingPage: Page = () => {
  const { isUserLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push(Path.Home)
    }
  }, [isUserLoggedIn, router])

  return <LandingPageContent />
}

export default LandingPage

LandingPage.getLayout = function getLayout(page) {
  return <WebsitePageLayout>{page}</WebsitePageLayout>
}
