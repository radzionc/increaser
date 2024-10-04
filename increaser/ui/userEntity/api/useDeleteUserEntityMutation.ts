import { useMutation } from '@tanstack/react-query'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { UserEntity, userEntityRecordName } from '@increaser/entities/User'
import { omit } from '@lib/utils/record/omit'
import { useUpdateUser, useUser } from '../../user/state/user'
import { useUserQuery } from '../../user/queries/useUserQuery'

const affectOtherEntitiesOnDelete: UserEntity[] = [
  'taskFactory',
  'project',
  'principleCategory',
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
