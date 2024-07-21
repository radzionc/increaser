import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { useApi } from '@increaser/api-ui/state/ApiContext'

export const useCreateTaskTemplateMutation = () => {
  const { taskTemplates } = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (input: ApiInterface['createTaskTemplate']['input']) => {
      updateState({ taskTemplates: { ...taskTemplates, [input.id]: input } })

      await api.call('createTaskTemplate', input)
    },
  })
}
