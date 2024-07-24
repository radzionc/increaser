import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'

export const useCreateTaskTemplateMutation = () => {
  const { taskTemplates } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (value: TaskTemplate) => {
      updateState({ taskTemplates: { ...taskTemplates, [value.id]: value } })

      await api.call('createUserEntity', {
        entity: 'taskTemplate',
        value,
      })
    },
  })
}
