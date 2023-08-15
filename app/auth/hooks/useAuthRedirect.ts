import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Path } from 'router/Path'
import {
  PersistentStorageKey,
  persistentStorage,
} from 'state/persistentStorage'

export const useAuthRedirect = () => {
  const { push, pathname } = useRouter()

  const toAuthenticationPage = useCallback(() => {
    persistentStorage.setItem(
      PersistentStorageKey.PathAttemptedWhileUnauthenticated,
      pathname,
    )
    push(Path.SignIn)
  }, [pathname, push])

  const toAuthenticatedPage = useCallback(() => {
    const destination =
      persistentStorage.getItem(
        PersistentStorageKey.PathAttemptedWhileUnauthenticated,
      ) ?? Path.Home
    console.log('Redirect to authenticated page: ', destination)
    push(destination)
    persistentStorage.setItem(
      PersistentStorageKey.PathAttemptedWhileUnauthenticated,
      undefined,
    )
  }, [push])

  return {
    toAuthenticationPage,
    toAuthenticatedPage,
  } as const
}
