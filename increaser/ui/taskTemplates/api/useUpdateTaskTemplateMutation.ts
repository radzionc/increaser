import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { UpdateUserEntityParams } from '@increaser/api-ui/UpdateUserEntityParams'

export const useUpdateTaskTemplateMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { taskTemplates } = useAssertUserState()

  return useMutation({
    mutationFn: async ({
      id,
      fields,
    }: UpdateUserEntityParams<'taskTemplate'>) => {
      updateState({
        taskTemplates: recordMap(taskTemplates, (item) =>
          item.id === id ? { ...item, ...fields } : item,
        ),
      })

      await api.call('updateUserEntity', {
        entity: 'taskTemplate',
        id,
        fields,
      })
    },
  })
}
