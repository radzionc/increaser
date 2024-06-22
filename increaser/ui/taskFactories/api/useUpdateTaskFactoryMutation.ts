import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

export const useUpdateTaskFactoryMutation = () => {
  const api = useApi()
  const { updateState, pullRemoteState } = useUserState()
  const { taskFactories } = useAssertUserState()

  return useMutation({
    mutationFn: async (input: ApiInterface['updateTaskFactory']['input']) => {
      updateState({
        taskFactories: recordMap(taskFactories, (item) =>
          item.id === input.id ? { ...item, ...input.fields } : item,
        ),
      })

      await api.call('updateTaskFactory', input)

      pullRemoteState()
    },
  })
}
