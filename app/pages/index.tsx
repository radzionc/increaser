import { useAuth } from 'auth/hooks/useAuth'
import { LandingPage as LandingPageContent } from 'landing/components'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Path } from 'router/Path'

export const LandingPage = () => {
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
