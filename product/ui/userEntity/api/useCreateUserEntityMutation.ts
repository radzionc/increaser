import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { pick } from '@lib/utils/record/pick'
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

const affectOtherEntitiesOnCreate: UserEntity[] = ['taskFactory']

type UserEntityTrackingParams<T extends UserEntity> = {
  getParams: (value: UserEntityType[T]) => Record<string, any>
  entityName: string
}

const trackUserEntityCreation: Partial<{
  [T in UserEntity]: UserEntityTrackingParams<T>
}> = {
  project: {
    getParams: (value) => pick(value, ['name']),
    entityName: 'project',
  },
  habit: {
    getParams: (value) => pick(value, ['name']),
    entityName: 'habit',
  },
  visionAttribute: {
    getParams: (value) => pick(value, ['name']),
    entityName: 'vision attribute',
  },
  goal: {
    getParams: (value) => pick(value, ['name']),
    entityName: 'goal',
  },
  principle: {
    getParams: (value) => pick(value, ['name']),
    entityName: 'principle',
  },
  principleCategory: {
    getParams: (value) => pick(value, ['name']),
    entityName: 'principle category',
  },
}

type CreateUserEntityMutationOptions<T extends UserEntity> = {
  onSuccess?: (value: UserEntityType[T]) => void
  onOptimisticUpdate?: (value: UserEntityType[T]) => void
}

export const useCreateUserEntityMutation = <T extends UserEntity>(
  entity: T,
  options?: CreateUserEntityMutationOptions<T>,
) => {
  const user = useUser()
  const updateState = useUpdateUser()
  const { refetch } = useUserQuery()
  const api = useApi()
  const { trackEvent } = useAnalytics()

  return useMutation({
    mutationFn: async (value: UserEntityType[T]) => {
      const key = userEntityRecordName[entity]

      const result = await api.call('createUserEntity', {
        entity,
        value,
      })

      if (processedByApi.includes(entity)) {
        updateState({
          [key]: {
            ...user[key],
            [value.id]: result,
          },
        })
      }

      if (trackUserEntityCreation[entity]) {
        const { entityName, getParams } = trackUserEntityCreation[entity]
        trackEvent(`Create ${entityName}`, getParams(value))
      }

      if (affectOtherEntitiesOnCreate.includes(entity)) {
        refetch()
      }

      return result
    },
    onMutate: async (value: UserEntityType[T]) => {
      const key = userEntityRecordName[entity]
      updateState({
        [key]: {
          ...user[key],
          [value.id]: value,
        },
      })

      options?.onOptimisticUpdate?.(value)

      return value
    },
    onSuccess: options?.onSuccess,
  })
}
