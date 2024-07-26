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
import { pick } from '@lib/utils/record/pick'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

const affectOtherEntitiesOnCreate: UserEntity[] = ['taskFactory']
const processedByApiOnCreate: UserEntity[] = ['visionAttribute']

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
}

export const useCreateUserEntityMutation = <T extends UserEntity>(
  entity: T,
  options?: CreateUserEntityMutationOptions<T>,
) => {
  const user = useAssertUserState()
  const { updateState, pullRemoteState } = useUserState()
  const api = useApi()
  const { trackEvent } = useAnalytics()

  return useMutation({
    mutationFn: async (value: UserEntityType[T]) => {
      const key = userEntityRecordName[entity]
      updateState({
        [key]: {
          ...user[key],
          [value.id]: value,
        },
      })

      const result = await api.call('createUserEntity', {
        entity,
        value,
      })

      if (processedByApiOnCreate.includes(entity)) {
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
        pullRemoteState()
      }

      return result
    },
    onSuccess: options?.onSuccess,
  })
}
