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
import {
  affectOtherEntitiesOnUpdate,
  UpdateUserEntityInput,
} from './useUpdateUserEntityMutation'
import { processedByApi } from './shared'

export const useUpdateUserEntitiesMutation = <T extends UserEntity>(
  entity: T,
) => {
  const user = useAssertUserState()
  const { updateState, pullRemoteState } = useUserState()
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
        pullRemoteState()
      }
    },
  })
}
