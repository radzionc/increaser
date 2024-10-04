import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { userStateQueryKey, useUserQuery } from '../queries/useUserQuery'
import { User } from '@increaser/entities/User'
import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

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
