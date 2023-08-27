import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'
import { useUserState } from 'user/state/UserStateContext'

export const updateGoalToFinishWorkByMutationDocument = graphql(`
  mutation updateGoalToFinishWorkBy($input: UpdateGoalToFinishWorkByInput!) {
    updateGoalToFinishWorkBy(input: $input)
  }
`)

export const useUpdateGoalToFinishWorkByMutation = () => {
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (goalToFinishWorkBy: number) => {
    updateState({ goalToFinishWorkBy })

    await updateRemoteState(updateGoalToFinishWorkByMutationDocument, {
      input: {
        goalToFinishWorkBy,
      },
    })
  })
}
