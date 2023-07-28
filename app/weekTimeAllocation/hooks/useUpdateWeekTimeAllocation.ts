import { useMutation } from 'react-query'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'
import { WeekTimeAllocation } from 'weekTimeAllocation/WeekTimeAllocation'

const updateWeekTimeAllocationMutation = `
mutation updateWeekTimeAllocation($input: UpdateWeekTimeAllocationInput!) {
  updateWeekTimeAllocation(input: $input)
}
`

export const useUpdateWeekTimeAllocation = () => {
  const state = useAssertUserState()
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (allocation: WeekTimeAllocation) => {
    updateState({ ...state, weekTimeAllocation: allocation })

    const weekTimeAllocation = await updateRemoteState<WeekTimeAllocation>({
      query: updateWeekTimeAllocationMutation,
      variables: {
        input: { allocation },
      },
    })

    return weekTimeAllocation
  })
}
