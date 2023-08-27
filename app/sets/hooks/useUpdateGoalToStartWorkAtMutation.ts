import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'
import { useUserState } from 'user/state/UserStateContext'

export const updateGoalToStartAtMutationDocument = graphql(`
  mutation updateGoalToStartWorkAt($input: UpdateGoalToStartWorkAtInput!) {
    updateGoalToStartWorkAt(input: $input)
  }
`)

export const useUpdateGoalToStartWorkAtMutation = () => {
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (goalToStartWorkAt: number) => {
    updateState({ goalToStartWorkAt })

    await updateRemoteState(updateGoalToStartAtMutationDocument, {
      input: {
        goalToStartWorkAt,
      },
    })
  })
}
