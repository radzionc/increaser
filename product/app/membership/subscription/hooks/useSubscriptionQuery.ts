import { useOnQuerySuccess } from '@lib/ui/query/hooks/useOnQuerySuccess'
import { useApiQuery } from '@product/api-ui/hooks/useApiQuery'
import { useUpdateUser } from '@product/ui/user/state/user'
import { useCallback } from 'react'

export const useSubscriptionQuery = (id: string) => {
  const query = useApiQuery('subscription', { id })
  const updateState = useUpdateUser()
  useOnQuerySuccess(
    query,
    useCallback(
      (subscription) => {
        updateState({ subscription })
      },
      [updateState],
    ),
  )

  return query
}
