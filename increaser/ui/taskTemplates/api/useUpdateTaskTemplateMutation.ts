import { ApiInterface } from '@increaser/api-interface/ApiInterface'
import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'

export const useUpdateTaskTemplateMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { taskTemplates } = useAssertUserState()

  return useMutation({
    mutationFn: async (input: ApiInterface['updateTaskTemplate']['input']) => {
      updateState({
        taskTemplates: recordMap(taskTemplates, (item) =>
          item.id === input.id ? { ...item, ...input.fields } : item,
        ),
      })

      await api.call('updateTaskTemplate', input)
    },
  })
}
