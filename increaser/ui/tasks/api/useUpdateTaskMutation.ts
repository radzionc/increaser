import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { UpdateUserEntityParams } from '@increaser/api-ui/UpdateUserEntityParams'

export const useUpdateTaskMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { tasks } = useAssertUserState()

  return useMutation({
    mutationFn: async ({ id, fields }: UpdateUserEntityParams<'task'>) => {
      updateState({
        tasks: recordMap(tasks, (task) =>
          task.id === id ? { ...task, ...fields } : task,
        ),
      })

      return api.call('updateUserEntity', {
        id,
        fields,
        entity: 'task',
      })
    },
  })
}
