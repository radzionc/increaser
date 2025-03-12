import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { AuthSession } from '@product/entities/AuthSession'
import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export const useAuthSession = () => {
  const queryClient = useQueryClient()

  const [session, setSession] = usePersistentState<AuthSession | null>(
    PersistentStateKey.AuthSession,
    null,
  )

  const analytics = useAnalytics()

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
    [queryClient, setSession, analytics],
  )

  return [session, onChange] as const
}
