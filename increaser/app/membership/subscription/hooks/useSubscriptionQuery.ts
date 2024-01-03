import { useOnQuerySuccess } from '@lib/ui/query/hooks/useOnQuerySuccess'
import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'
import { useCallback } from 'react'
import { useUserState } from '@increaser/app/user/state/UserStateContext'

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
