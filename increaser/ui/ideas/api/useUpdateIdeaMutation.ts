import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { UpdateUserEntityParams } from '@increaser/api-ui/UpdateUserEntityParams'

export const useUpdateIdeaMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { ideas } = useAssertUserState()

  return useMutation({
    mutationFn: async ({ fields, id }: UpdateUserEntityParams<'idea'>) => {
      updateState({
        ideas: recordMap(ideas, (value) =>
          value.id === id ? { ...value, ...fields } : value,
        ),
      })

      return api.call('updateUserEntity', {
        id,
        entity: 'idea',
        fields,
      })
    },
  })
}
