import { scoreboardPeriods } from '@increaser/entities/PerformanceScoreboard'
import { useInvalidateQueries } from '@lib/ui/query/hooks/useInvalidateQueries'
import { User } from '@sentry/nextjs'
import { useApi } from '@increaser/api-ui/state/ApiContext'
import { getApiQueryKey } from '@increaser/api-ui/hooks/useApiQuery'
import { useMutation } from '@tanstack/react-query'
import { useUpdateUser } from '@increaser/ui/user/state/user'

export const useUpdateUserProfileMutation = () => {
  const invalidate = useInvalidateQueries()
  const api = useApi()
  const updateUser = useUpdateUser()

  return useMutation({
    mutationFn: (
      fields: Partial<Pick<User, 'name' | 'country' | 'isAnonymous'>>,
    ) => {
      updateUser(fields)
      return api.call('updateUser', fields)
    },
    onSuccess: () => {
      invalidate(
        ...scoreboardPeriods.map((id) => getApiQueryKey('scoreboard', { id })),
      )
    },
  })
}
