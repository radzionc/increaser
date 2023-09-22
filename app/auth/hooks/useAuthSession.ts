import { AuthSession } from '@increaser/api-interface/client/graphql'
import { analytics } from 'analytics'
import { useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { PersistentStateKey, usePersistentState } from 'state/persistentState'

export const useAuthSession = () => {
  const queryClient = useQueryClient()

  const [session, setSession] = usePersistentState<AuthSession | undefined>(
    PersistentStateKey.AuthSession,
    undefined,
  )

  const onChange = useCallback(
    (session: AuthSession | undefined) => {
      if (session) {
        analytics.trackEvent('Finish identification')

        if (session.isFirst) {
          analytics.trackEvent('Finish Sign Up')
        }
      } else {
        queryClient.clear()
      }

      setSession(session)
    },
    [queryClient, setSession],
  )

  return [session, onChange] as const
}
