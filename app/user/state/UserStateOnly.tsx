import { useAuth } from 'auth/hooks/useAuth'
import { Path } from 'router/Path'
import { ComponentWithChildrenProps } from 'shared/props'

import { useUserState } from './UserStateContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const UserStateOnly = ({ children }: ComponentWithChildrenProps) => {
  const { state } = useUserState()

  const router = useRouter()

  const { isUserLoggedIn } = useAuth()

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push(Path.Landing)
    }
  }, [isUserLoggedIn, router])

  return state ? <>{children}</> : null
}
