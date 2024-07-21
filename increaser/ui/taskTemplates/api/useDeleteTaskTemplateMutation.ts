import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'

export const useDeleteTaskTemplateMutation = () => {
  const { taskTemplates } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: EntityWithId) => {
      updateState({
        taskTemplates: omit(taskTemplates, input.id),
      })

      await api.call('deleteTaskTemplate', input)
    },
  })
}
