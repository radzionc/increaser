import { useOnQuerySuccess } from '@increaser/ui/query/hooks/useOnQuerySuccess'
import { useApiQuery } from 'api/hooks/useApiQuery'
import { useCallback } from 'react'
import { useUserState } from 'user/state/UserStateContext'

export const useSubscriptionQuery = (id: string) => {
  const query = useApiQuery('subscription', { id })
  const { updateState } = useUserState()
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
