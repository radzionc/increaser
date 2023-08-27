import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'
import { useUserState } from 'user/state/UserStateContext'

export const updateGoalToGoToBedAtQueryDocument = graphql(`
  mutation updateGoalToGoToBedAt($input: UpdateGoalToGoToBedAtInput!) {
    updateGoalToGoToBedAt(input: $input)
  }
`)

export const useUpdateGoalToGoToBedAtMutation = () => {
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (goalToGoToBedAt: number) => {
    updateState({ goalToGoToBedAt })

    await updateRemoteState(updateGoalToGoToBedAtQueryDocument, {
      input: {
        goalToGoToBedAt,
      },
    })
  })
}
