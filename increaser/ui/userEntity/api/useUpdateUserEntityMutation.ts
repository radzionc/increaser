import { useMutation } from '@tanstack/react-query'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import {
  UserEntity,
  userEntityRecordName,
  UserEntityType,
} from '@increaser/entities/User'
import { recordMap } from '@lib/utils/record/recordMap'
import { processedByApi } from './shared'
import { useUpdateUser, useUser } from '../../user/state/user'
import { useUserQuery } from '../../user/queries/useUserQuery'

export type UpdateUserEntityInput<T extends UserEntity> = {
  fields: Partial<Omit<UserEntityType[T], 'id'>>
  id: string
}

export const affectOtherEntitiesOnUpdate: UserEntity[] = ['taskFactory']

export const useUpdateUserEntityMutation = <T extends UserEntity>(
  entity: T,
) => {
  const user = useUser()
  const updateState = useUpdateUser()
  const { refetch } = useUserQuery()
  const api = useApi()

  return useMutation({
    mutationFn: async ({ fields, id }: UpdateUserEntityInput<T>) => {
      const key = userEntityRecordName[entity]
      updateState({
        [key]: recordMap(user[key] as any, (value: any) =>
          value.id === id ? { ...value, ...fields } : value,
        ),
      })

      const result = await api.call('updateUserEntity', {
        entity,
        fields,
        id,
      })

      if (processedByApi.includes(entity)) {
        updateState({
          [key]: {
            ...user[key],
            [id]: result,
          },
        })
      }

      if (affectOtherEntitiesOnUpdate.includes(entity)) {
        refetch()
      }
    },
  })
}
