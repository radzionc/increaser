import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useApi } from '@increaser/api-ui/hooks/useApi'

export const useCreateTaskMutation = () => {
  const { tasks } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (task: ApiInterface['createTask']['input']) => {
      updateState({ tasks: { ...tasks, [task.id]: task } })

      await api.call('createTask', task)
    },
  })
}
