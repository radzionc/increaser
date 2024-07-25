import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { TaskFactory } from '@increaser/entities/TaskFactory'

export const useCreateTaskFactoryMutation = () => {
  const { taskFactories } = useAssertUserState()
  const { updateState, pullRemoteState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: TaskFactory) => {
      updateState({ taskFactories: { ...taskFactories, [input.id]: input } })

      await api.call('createUserEntity', {
        entity: 'taskFactory',
        value: input,
      })

      pullRemoteState()
    },
  })
}
