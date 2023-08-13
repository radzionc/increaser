import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from './useAuth'
import { Path } from 'router/Path'

export const useUnauthorizedOnly = () => {
  const { isUserLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push(Path.Home)
    }
  }, [isUserLoggedIn, router])
}
