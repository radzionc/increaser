import { AuthContext, AuthSessionInfo } from 'auth/context/AuthContext'
import { ReactNode, useCallback, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import {
  PersistentStorageKey,
  usePersistentStorageValue,
} from 'state/persistentStorage'
import { MS_IN_DAY, MS_IN_SEC } from 'utils/time'

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = usePersistentStorageValue<string | undefined>(
    PersistentStorageKey.AuthToken,
    undefined,
  )
  const [tokenExpirationTime, setTokenExpirationTime] =
    usePersistentStorageValue<number | undefined>(
      PersistentStorageKey.AuthTokenExpirationTime,
      undefined,
    )

  const isUserLoggedIn = !!token

  const queryClient = useQueryClient()

  const unauthorize = useCallback(() => {
    queryClient.clear()

    setToken(undefined)
    setTokenExpirationTime(undefined)
  }, [queryClient, setToken, setTokenExpirationTime])

  const updateSession = useCallback(
    ({ token, tokenExpirationTime }: AuthSessionInfo) => {
      setToken(token)
      setTokenExpirationTime(tokenExpirationTime)
    },
    [setToken, setTokenExpirationTime],
  )

  useEffect(() => {
    if (!tokenExpirationTime) return
    const daysBeforeTokenExpiration =
      (tokenExpirationTime * MS_IN_SEC - Date.now()) / MS_IN_DAY

    if (daysBeforeTokenExpiration < 1) {
      unauthorize()
    }
  }, [tokenExpirationTime, unauthorize])

  return (
    <AuthContext.Provider
      value={{ token, updateSession, unauthorize, isUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}
