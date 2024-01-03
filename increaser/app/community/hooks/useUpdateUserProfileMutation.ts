import { scoreboardPeriods } from '@increaser/entities/PerformanceScoreboard'
import { useInvalidateQueries } from '@lib/ui/query/hooks/useInvalidateQueries'
import { User } from '@sentry/nextjs'
import { useApi } from '@increaser/api-ui/hooks/useApi'
import { getApiQueryKey } from '@increaser/api-ui/hooks/useApiQuery'
import { useMutation } from 'react-query'
import { useUserState } from '@increaser/app/user/state/UserStateContext'

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
