import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useApi } from '@increaser/api-ui/state/ApiContext'

export const useCreateTaskFactoryMutation = () => {
  const { taskFactories } = useAssertUserState()
  const { updateState, pullRemoteState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: ApiInterface['createTaskFactory']['input']) => {
      updateState({ taskFactories: { ...taskFactories, [input.id]: input } })

      await api.call('createTaskFactory', input)

      pullRemoteState()
    },
  })
}
