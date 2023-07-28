import { useMainApi } from 'api/hooks/useMainApi'
import { useAuth } from 'auth/hooks/useAuth'
import { habitsFragment } from 'habits/api/habitsFragment'
import { projectFragment } from 'projects/api/projectFragment'
import { ReactNode, useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { setsFragment } from 'sets/api/setsFragment'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { getTimeZone } from 'shared/utils/getTimeZone'
import { taskFragment } from 'tasks/api/taskFragment'
import { UserStateContext, UserStateView } from 'user/state/UserStateContext'

const userStateQuery = `
query userState($input: UserStateInput!) {
  userState(input: $input) {
    sets {
      ${setsFragment}
    }
    prevSets {
      ${setsFragment}
    }
    projects {
      ${projectFragment}
    }
    habits {
      ${habitsFragment}
    }
    tasks {
      ${taskFragment}
    }
    email
    id
    name
    membership {
      provider
      subscription {
        updateUrl
        cancelUrl
        planId
        cancellationEffectiveDate
        nextBillDate
        planId
      }
    }
    freeTrialEnd
    registrationDate
    weekTimeAllocation
    goalToStartWorkAt
    goalToFinishWorkBy
    goalToGoToBedAt
    primaryGoal
    focusSounds {
      name
      url
      favourite
    }
  }
}
`

const userStateQueryKey = userStateQuery

interface Props {
  children: ReactNode
}

export const UserStateProvider = ({ children }: Props) => {
  const { isUserLoggedIn } = useAuth()

  const queryClient = useQueryClient()

  const { query } = useMainApi()

  const dayStartedAt = useStartOfDay()

  const {
    data = null,
    refetch,
    isLoading,
    dataUpdatedAt,
  } = useQuery(
    userStateQueryKey,
    async () => {
      const userState: UserStateView = await query({
        query: userStateQuery,
        variables: {
          input: {
            timeZone: getTimeZone(),
          },
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
    (pieceOfState: Partial<UserStateView>) => {
      queryClient.setQueryData<UserStateView>(userStateQueryKey, (state) => ({
        ...((state || {}) as UserStateView),
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
      {/* {data && !data.name && <AskForNameOverlay />} */}
    </UserStateContext.Provider>
  )
}
