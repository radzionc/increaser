import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

export const useDeleteTaskTemplateMutation = () => {
  const { taskTemplates } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (id: string) => {
      updateState({
        taskTemplates: omit(taskTemplates, id),
      })

      await api.call('deleteUserEntity', {
        id,
        entity: 'taskTemplate',
      })
    },
  })
}
