import { PrimaryGoal } from 'capacity/PrimaryGoal'
import { useMutation } from 'react-query'
import { Task } from 'tasks/Task'
import { FocusSound, useUserState } from 'user/state/UserStateContext'

interface UpdateUserParams {
  name?: string
  primaryGoal?: PrimaryGoal
  focusSounds?: FocusSound[]
  tasks?: Task[]
  isAnonymous?: boolean
}

const updateUserMutation = `
mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    name
  }
}`

export const useUpdateUserMutation = () => {
  const { updateState, updateRemoteState } = useUserState()

  return useMutation(async (input: UpdateUserParams) => {
    updateState(input)

    await updateRemoteState({
      query: updateUserMutation,
      variables: {
        input,
      },
    })
  })
}
