import { getCurrentTimezoneOffset } from '@increaser/utils/time/getCurrentTimezoneOffset'
import { UserStateQuery } from '@increaser/api-interface/client/graphql'
import { useApi } from 'api/useApi'
import { ReactNode, useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { UserStateContext } from 'user/state/UserStateContext'
import { userStateQueryDocument } from 'user/state/userStateQueryDocument'
import { useAuthSession } from 'auth/hooks/useAuthSession'

const userStateQueryKey = 'userState'

interface Props {
  children: ReactNode
}

export const UserStateProvider = ({ children }: Props) => {
  const [authSession] = useAuthSession()

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
      enabled: Boolean(authSession),
      refetchOnWindowFocus: false,
    },
  )

  useEffect(() => {
    if (dataUpdatedAt && dataUpdatedAt < dayStartedAt) {
      refetch()
    }
  }, [dataUpdatedAt, dayStartedAt, refetch])

  const updateState = useCallback(
    (pieceOfState: Partial<UserStateQuery['userState']>) => {
      queryClient.setQueryData<UserStateQuery['userState']>(
        userStateQueryKey,
        (state) => ({
          ...(state || ({} as UserStateQuery['userState'])),
          ...pieceOfState,
        }),
      )
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
