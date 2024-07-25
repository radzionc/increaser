import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

export const useDeleteTaskFactoryMutation = () => {
  const { taskFactories } = useAssertUserState()
  const { updateState, pullRemoteState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (id: string) => {
      updateState({
        taskFactories: omit(taskFactories, id),
      })

      await api.call('deleteUserEntity', {
        id,
        entity: 'taskFactory',
      })

      pullRemoteState()
    },
  })
}
