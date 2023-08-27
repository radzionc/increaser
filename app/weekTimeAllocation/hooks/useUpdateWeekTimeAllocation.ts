import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { WeekTimeAllocation } from 'weekTimeAllocation/WeekTimeAllocation'

const updateWeekTimeAllocationMutationDocument = graphql(`
  mutation updateWeekTimeAllocation($input: UpdateWeekTimeAllocationInput!) {
    updateWeekTimeAllocation(input: $input)
  }
`)

export const useUpdateWeekTimeAllocation = () => {
  const state = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (allocation: WeekTimeAllocation) => {
    updateState({ ...state, weekTimeAllocation: allocation })

    const weekTimeAllocation = await updateRemoteState(
      updateWeekTimeAllocationMutationDocument,
      {
        input: { allocation },
      },
    )

    return weekTimeAllocation
  })
}
