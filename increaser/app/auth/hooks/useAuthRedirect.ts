import { useRouter } from 'next/router'
import { useCallback } from 'react'
import {
  PersistentStateKey,
  managePersistentState,
} from '@increaser/ui/state/persistentState'
import { getAppPath } from '@increaser/ui/navigation/app'

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
