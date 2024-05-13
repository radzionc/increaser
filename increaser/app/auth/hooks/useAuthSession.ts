import { AuthSession } from '@increaser/entities/AuthSession'
import { analytics } from '@increaser/app/analytics'
import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const useAuthSession = () => {
  const queryClient = useQueryClient()

  const [session, setSession] = usePersistentState<AuthSession | null>(
    PersistentStateKey.AuthSession,
    null,
  )

  const onChange = useCallback(
    (session: AuthSession | null) => {
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
