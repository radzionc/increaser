import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

export const useUpdateTaskMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { tasks } = useAssertUserState()

  return useMutation({
    mutationFn: async (input: ApiInterface['updateTask']['input']) => {
      updateState({
        tasks: recordMap(tasks, (task) =>
          task.id === input.id ? { ...task, ...input.fields } : task,
        ),
      })

      return api.call('updateTask', input)
    },
  })
}
