import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { UserEntity, userEntityRecordName } from '@increaser/entities/User'
import { omit } from '@lib/utils/record/omit'

export const useDeleteUserEntityMutation = <T extends UserEntity>(
  entity: T,
) => {
  const user = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (id: string) => {
      const key = userEntityRecordName[entity]
      updateState({
        [key]: omit(user[key], id),
      })

      await api.call('deleteUserEntity', {
        entity,
        id,
      })
    },
  })
}
