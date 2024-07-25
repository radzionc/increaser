import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { UpdateUserEntityParams } from '@increaser/api-ui/UpdateUserEntityParams'

export const useUpdateTaskFactoryMutation = () => {
  const api = useApi()
  const { updateState, pullRemoteState } = useUserState()
  const { taskFactories } = useAssertUserState()

  return useMutation({
    mutationFn: async ({
      id,
      fields,
    }: UpdateUserEntityParams<'taskFactory'>) => {
      updateState({
        taskFactories: recordMap(taskFactories, (item) =>
          item.id === id ? { ...item, ...fields } : item,
        ),
      })

      await api.call('updateUserEntity', {
        id,
        fields,
        entity: 'taskFactory',
      })

      pullRemoteState()
    },
  })
}
