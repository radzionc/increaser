import { useApi } from '@increaser/api-ui/hooks/useApi'
import { useMutation } from 'react-query'
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

  return useMutation(async (input: DeleteTaskParams) => {
    updateState({
      tasks: omit(tasks, input.id),
    })

    await api.call('deleteTask', input)
  })
}
