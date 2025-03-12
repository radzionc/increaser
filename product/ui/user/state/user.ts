import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { User } from '@product/entities/User'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { userStateQueryKey, useUserQuery } from '../queries/useUserQuery'

export const useUser = () => {
  const { data } = useUserQuery()

  return shouldBePresent(data)
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useCallback(
    (fields: Partial<User>) => {
      queryClient.setQueryData<User>(userStateQueryKey, (user) => {
        if (!user) {
          return user
        }

        return {
          ...user,
          ...fields,
        }
      })
    },
    [queryClient],
  )
}
