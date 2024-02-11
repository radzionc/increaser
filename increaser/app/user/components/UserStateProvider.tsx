import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { UserStateContext } from '@increaser/ui/user/UserStateContext'
import { useAuthSession } from '@increaser/app/auth/hooks/useAuthSession'
import { User } from '@increaser/entities/User'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import { ComponentWithChildrenProps } from '@lib/ui/props'

const userStateQueryKey = ['userState']

export const UserStateProvider = ({ children }: ComponentWithChildrenProps) => {
  const [authSession] = useAuthSession()

  const queryClient = useQueryClient()

  const api = useApi()

  const dayStartedAt = useStartOfDay()

  const {
    data = null,
    refetch,
    isLoading,
    dataUpdatedAt,
  } = useQuery({
    queryKey: userStateQueryKey,
    queryFn: () =>
      api.call('user', {
        timeZone: getCurrentTimezoneOffset(),
      }),
    enabled: Boolean(authSession),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (dataUpdatedAt && dataUpdatedAt < dayStartedAt) {
      refetch()
    }
  }, [dataUpdatedAt, dayStartedAt, refetch])

  const updateState = useCallback(
    (pieceOfState: Partial<User>) => {
      queryClient.setQueryData<User>(userStateQueryKey, (state) => ({
        ...(state || ({} as User)),
        ...pieceOfState,
      }))
    },
    [queryClient],
  )

  return (
    <UserStateContext.Provider
      value={{
        state: data,
        updateState,
        pullRemoteState: refetch,
        isLoading,
        lastUpdatedAt: dataUpdatedAt,
      }}
    >
      {children}
    </UserStateContext.Provider>
  )
}
