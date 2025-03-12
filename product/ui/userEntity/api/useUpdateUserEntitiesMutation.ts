import { recordMap } from '@lib/utils/record/recordMap'
import { useApi } from '@product/api-ui/state/ApiContext'
import {
  UserEntity,
  userEntityRecordName,
  UserEntityType,
} from '@product/entities/User'
import { useMutation } from '@tanstack/react-query'

import { useUserQuery } from '../../user/queries/useUserQuery'
import { useUpdateUser, useUser } from '../../user/state/user'

import { processedByApi } from './shared'
import {
  affectOtherEntitiesOnUpdate,
  UpdateUserEntityInput,
} from './useUpdateUserEntityMutation'

export const useUpdateUserEntitiesMutation = <T extends UserEntity>(
  entity: T,
) => {
  const user = useUser()
  const updateState = useUpdateUser()
  const { refetch } = useUserQuery()
  const api = useApi()

  return useMutation({
    mutationFn: async (updates: UpdateUserEntityInput<T>[]) => {
      const key = userEntityRecordName[entity]
      updateState({
        [key]: recordMap(user[key] as any, (value: any) => {
          const update = updates.find((update) => update.id === value.id)
          if (update) {
            return { ...value, ...update.fields }
          }

          return value
        }),
      })

      const result: UserEntityType[T][] = await api.call('updateUserEntities', {
        entity,
        updates,
      })

      if (processedByApi.includes(entity)) {
        updateState({
          [key]: recordMap(user[key] as any, (value: any) => {
            const newValue = result.find((update) => update.id === value.id)
            return newValue ?? value
          }),
        })
      }

      if (affectOtherEntitiesOnUpdate.includes(entity)) {
        refetch()
      }
    },
  })
}
