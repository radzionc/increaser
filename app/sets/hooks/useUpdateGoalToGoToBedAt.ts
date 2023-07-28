import { useMutation } from 'react-query'
import { useUserState } from 'user/state/UserStateContext'

export const updateGoalToGoToBedAtQuery = `
mutation updateGoalToGoToBedAt($input: UpdateGoalToGoToBedAtInput!) {
  updateGoalToGoToBedAt(input: $input)
}
`

export const useUpdateGoalToGoToBedAtMutation = () => {
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (goalToGoToBedAt: number) => {
    updateState({ goalToGoToBedAt })

    await updateRemoteState({
      query: updateGoalToGoToBedAtQuery,
      variables: {
        input: {
          goalToGoToBedAt,
        },
      },
    })
  })
}
