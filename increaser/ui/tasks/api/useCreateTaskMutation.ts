import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { Task } from '@increaser/entities/Task'

export const useCreateTaskMutation = () => {
  const { tasks } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (task: Task) => {
      updateState({ tasks: { ...tasks, [task.id]: task } })

      await api.call('createUserEntity', {
        entity: 'task',
        value: task,
      })
    },
  })
}
