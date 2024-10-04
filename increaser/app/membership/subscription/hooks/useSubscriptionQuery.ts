import { useOnQuerySuccess } from '@lib/ui/query/hooks/useOnQuerySuccess'
import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'
import { useCallback } from 'react'
import { useUpdateUser } from '@increaser/ui/user/state/user'

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
