import { getCurrentTimezoneOffset } from '@increaser/utils/getCurrentTimezoneOffset'
import { UserState } from '@increaser/api-interface/client/graphql'
import { useApi } from 'api/useApi'
import { useAuth } from 'auth/hooks/useAuth'
import { ReactNode, useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { UserStateContext } from 'user/state/UserStateContext'
import { userStateQueryDocument } from 'user/state/userStateQueryDocument'

const userStateQueryKey = 'userState'

interface Props {
  children: ReactNode
}

export const UserStateProvider = ({ children }: Props) => {
  const { isUserLoggedIn } = useAuth()

  const queryClient = useQueryClient()

  const { query } = useApi()

  const dayStartedAt = useStartOfDay()

  const {
    data = null,
    refetch,
    isLoading,
    dataUpdatedAt,
  } = useQuery(
    userStateQueryKey,
    async () => {
      const { userState } = await query(userStateQueryDocument, {
        input: {
          timeZone: getCurrentTimezoneOffset(),
        },
      })

      return userState
    },
    {
      keepPreviousData: true,
      enabled: isUserLoggedIn,
      refetchOnWindowFocus: false,
    },
  )

  useEffect(() => {
    if (dataUpdatedAt && dataUpdatedAt < dayStartedAt) {
      refetch()
    }
  }, [dataUpdatedAt, dayStartedAt, refetch])

  const updateState = useCallback(
    (pieceOfState: Partial<UserState>) => {
      queryClient.setQueryData<UserState>(userStateQueryKey, (state) => ({
        ...((state || {}) as UserState),
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
        updateRemoteState: query,
      }}
    >
      {children}
    </UserStateContext.Provider>
  )
}
