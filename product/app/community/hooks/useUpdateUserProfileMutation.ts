import { useInvalidateQueries } from '@lib/ui/query/hooks/useInvalidateQueries'
import { getApiQueryKey } from '@product/api-ui/hooks/useApiQuery'
import { useApi } from '@product/api-ui/state/ApiContext'
import { scoreboardPeriods } from '@product/entities/PerformanceScoreboard'
import { useUpdateUser } from '@product/ui/user/state/user'
import { User } from '@sentry/nextjs'
import { useMutation } from '@tanstack/react-query'

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
