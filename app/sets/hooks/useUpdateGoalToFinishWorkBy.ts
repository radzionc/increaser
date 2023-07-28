import { useMutation } from 'react-query'
import { useUserState } from 'user/state/UserStateContext'

export const updateGoalToStartAt = `
mutation updateGoalToFinishWorkBy($input: UpdateGoalToFinishWorkByInput!) {
  updateGoalToFinishWorkBy(input: $input)
}
`

export const useUpdateGoalToFinishWorkByMutation = () => {
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (goalToFinishWorkBy: number) => {
    updateState({ goalToFinishWorkBy })

    await updateRemoteState({
      query: updateGoalToStartAt,
      variables: {
        input: {
          goalToFinishWorkBy,
        },
      },
    })
  })
}
