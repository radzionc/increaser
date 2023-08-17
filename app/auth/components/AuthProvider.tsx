import { AuthContext, AuthSessionInfo } from 'auth/context/AuthContext'
import { ReactNode, useCallback, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { PersistentStateKey, usePersistentState } from 'state/persistentStorage'
import { MS_IN_DAY, MS_IN_SEC } from 'utils/time'

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = usePersistentState<string | undefined>(
    PersistentStateKey.AuthToken,
    undefined,
  )
  const [tokenExpirationTime, setTokenExpirationTime] = usePersistentState<
    number | undefined
  >(PersistentStateKey.AuthTokenExpirationTime, undefined)

  const isUserLoggedIn = !!token

  const queryClient = useQueryClient()

  const unauthorize = useCallback(() => {
    console.log('Unauthorize!')
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
      console.log('Unauthorize because token expires in less than one day')

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
