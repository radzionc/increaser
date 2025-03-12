import { getAppPath } from '@product/ui/navigation/app'
import {
  PersistentStateKey,
  managePersistentState,
} from '@product/ui/state/persistentState'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const persistentPath = managePersistentState<string>(
  PersistentStateKey.PathAttemptedWhileUnauthenticated,
)

export const useAuthRedirect = () => {
  const { replace, pathname } = useRouter()

  const toAuthenticationPage = useCallback(() => {
    persistentPath.set(pathname)
    replace(getAppPath('signIn'))
  }, [pathname, replace])

  const toAuthenticatedPage = useCallback(() => {
    persistentPath.get()
    const destination = persistentPath.get() ?? getAppPath('focus')
    replace(destination)
    persistentPath.set(undefined)
  }, [replace])

  return {
    toAuthenticationPage,
    toAuthenticatedPage,
  } as const
}
