import { useMutation } from '@tanstack/react-query'
import {
  useAssertUserState,
  useUserState,
} from '@increaser/ui/user/UserStateContext'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import {
  UserEntity,
  userEntityRecordName,
  UserEntityType,
} from '@increaser/entities/User'

export const useCreateUserEntityMutation = <T extends UserEntity>(
  entity: T,
) => {
  const user = useAssertUserState()
  const { updateState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async (value: UserEntityType[T]) => {
      const key = userEntityRecordName[entity]
      updateState({
        [key]: {
          ...user[key],
          [value.id]: value,
        },
      })

      await api.call('createUserEntity', {
        entity,
        value,
      })
    },
  })
}
