import { useRouter } from 'next/router'
import { useCallback } from 'react'
import {
  PersistentStateKey,
  managePersistentState,
} from '@increaser/app/state/persistentState'
import { AppPath } from '@increaser/ui/navigation/AppPath'

const persistentPath = managePersistentState<string>(
  PersistentStateKey.PathAttemptedWhileUnauthenticated,
)

export const useAuthRedirect = () => {
  const { replace, pathname } = useRouter()

  const toAuthenticationPage = useCallback(() => {
    persistentPath.set(pathname)
    replace(AppPath.SignIn)
  }, [pathname, replace])

  const toAuthenticatedPage = useCallback(() => {
    persistentPath.get()
    const destination = persistentPath.get() ?? AppPath.Home
    replace(destination)
    persistentPath.set(undefined)
  }, [replace])

  return {
    toAuthenticationPage,
    toAuthenticatedPage,
  } as const
}
