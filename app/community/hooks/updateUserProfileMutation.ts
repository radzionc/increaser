import { scoreboardPeriods } from '@increaser/entities/PerformanceScoreboard'
import { useInvalidateQueries } from '@increaser/ui/query/hooks/useInvalidateQueries'
import { User } from '@sentry/nextjs'
import { useApi } from 'api/hooks/useApi'
import { getApiQueryKey } from 'api/hooks/useApiQuery'
import { useMutation } from 'react-query'
import { useUserState } from 'user/state/UserStateContext'

export const useUpdateUserProfileMutation = () => {
  const invalidate = useInvalidateQueries()
  const api = useApi()
  const { updateState } = useUserState()

  return useMutation(
    (fields: Partial<Pick<User, 'name' | 'country' | 'isAnonymous'>>) => {
      updateState(fields)
      return api.call('updateUser', fields)
    },
    {
      onSuccess: () => {
        invalidate(
          ...scoreboardPeriods.map((id) =>
            getApiQueryKey('scoreboard', { id }),
          ),
        )
      },
    },
  )
}
