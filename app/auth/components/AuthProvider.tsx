import { useCallback, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { createContextHook } from '@increaser/ui/state/createContextHook'

import { createContext } from 'react'
import { useAuthToken } from 'auth/hooks/useAuthToken'
import { useAuthTokenExpirationTime } from 'auth/hooks/useAuthTokenExpirationTime'
import { convertDuration } from '@increaser/utils/time/convertDuration'

export type AuthSessionInfo = {
  token: string
  tokenExpirationTime: number
}

interface AuthState {
  isUserLoggedIn: boolean
  updateSession: (info: AuthSessionInfo) => void
  unauthorize: () => void
}

export const AuthContext = createContext<AuthState | undefined>(undefined)

export const AuthProvider = ({ children }: ComponentWithChildrenProps) => {
  const [token, setToken] = useAuthToken()
  const [tokenExpirationTime, setTokenExpirationTime] =
    useAuthTokenExpirationTime()

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

    const tokenExpiresAt = convertDuration(tokenExpirationTime, 's', 'ms')
    const tokenExpiresIn = tokenExpiresAt - Date.now()

    if (convertDuration(tokenExpiresIn, 'ms', 'h') < 3) {
      unauthorize()
    }
  }, [tokenExpirationTime, unauthorize])

  return (
    <AuthContext.Provider
      value={{ updateSession, unauthorize, isUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = createContextHook(AuthContext, 'AuthContext')
