import { omit } from '@lib/utils/record/omit'
import { useApi } from '@product/api-ui/state/ApiContext'
import { UserEntity, userEntityRecordName } from '@product/entities/User'
import { useMutation } from '@tanstack/react-query'

import { useUserQuery } from '../../user/queries/useUserQuery'
import { useUpdateUser, useUser } from '../../user/state/user'

const affectOtherEntitiesOnDelete: UserEntity[] = [
  'taskFactory',
  'project',
  'principleCategory',
  'principle',
  'habit',
]

export const useDeleteUserEntityMutation = <T extends UserEntity>(
  entity: T,
) => {
  const user = useUser()
  const updateState = useUpdateUser()
  const { refetch } = useUserQuery()
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

      if (affectOtherEntitiesOnDelete.includes(entity)) {
        refetch()
      }
    },
  })
}
