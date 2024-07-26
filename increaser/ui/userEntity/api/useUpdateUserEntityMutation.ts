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
import { recordMap } from '@lib/utils/record/recordMap'

type Input<T extends UserEntity> = {
  fields: Partial<Omit<UserEntityType[T], 'id'>>
  id: string
}

const affectOtherEntitiesOnUpdate: UserEntity[] = ['taskFactory']

export const useUpdateUserEntityMutation = <T extends UserEntity>(
  entity: T,
) => {
  const user = useAssertUserState()
  const { updateState, pullRemoteState } = useUserState()
  const api = useApi()

  return useMutation({
    mutationFn: async ({ fields, id }: Input<T>) => {
      const key = userEntityRecordName[entity]
      updateState({
        [key]: recordMap(user[key] as any, (value: any) =>
          value.id === id ? { ...value, ...fields } : value,
        ),
      })

      await api.call('updateUserEntity', {
        entity,
        fields,
        id,
      })

      if (affectOtherEntitiesOnUpdate.includes(entity)) {
        pullRemoteState()
      }
    },
  })
}
