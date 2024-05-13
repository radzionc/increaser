import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

interface DeleteTaskParams {
  id: string
}

export const useDeleteTaskMutation = () => {
  const { tasks } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: DeleteTaskParams) => {
      updateState({
        tasks: omit(tasks, input.id),
      })

      await api.call('deleteTask', input)
    },
  })
}
