import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { UpdateUserEntityParams } from '@increaser/api-ui/UpdateUserEntityParams'

export const useUpdateVisionAttributeMutation = () => {
  const api = useApi()
  const { updateState } = useUserState()
  const { vision } = useAssertUserState()

  return useMutation({
    mutationFn: async ({
      id,
      fields,
    }: UpdateUserEntityParams<'visionAttribute'>) => {
      updateState({
        vision: recordMap(vision, (value) =>
          value.id === id ? { ...value, ...fields } : value,
        ),
      })

      return api.call('updateUserEntity', {
        id,
        entity: 'visionAttribute',
        fields,
      })
    },
  })
}
