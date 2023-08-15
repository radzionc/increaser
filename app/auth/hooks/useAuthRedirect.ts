import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Path } from 'router/Path'
import {
  PersistentStorageKey,
  usePersistentStorageValue,
} from 'state/persistentStorage'

export const useAuthRedirect = () => {
  const { push, pathname } = useRouter()
  const [unauthenticatedPath, setUnauthenticatedPath] =
    usePersistentStorageValue<undefined | string>(
      PersistentStorageKey.PathAttemptedWhileUnauthenticated,
      undefined,
    )

  const toAuthenticationPage = useCallback(() => {
    setUnauthenticatedPath(pathname)
    push(Path.SignIn)
  }, [pathname, push, setUnauthenticatedPath])

  const toAuthenticatedPage = useCallback(() => {
    if (unauthenticatedPath) {
      push(unauthenticatedPath)
      setUnauthenticatedPath(undefined)
    } else {
      push(Path.Home)
    }
  }, [push, setUnauthenticatedPath, unauthenticatedPath])

  return {
    toAuthenticationPage,
    toAuthenticatedPage,
  } as const
}
