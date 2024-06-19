import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'

export const useDeleteTaskFactoryMutation = () => {
  const { taskFactories } = useAssertUserState()
  const { updateState, pullRemoteState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: EntityWithId) => {
      updateState({
        taskFactories: omit(taskFactories, input.id),
      })

      await api.call('deleteTaskFactory', input)

      pullRemoteState()
    },
  })
}
