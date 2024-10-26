import { useApi } from '@increaser/api-ui/state/ApiContext'
import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { useQuery } from '@tanstack/react-query'

export const userStateQueryKey = ['userState5']

export const useUserQuery = () => {
  const api = useApi()

  return useQuery({
    queryKey: userStateQueryKey,
    queryFn: () => {
      return api.call('user', {
        timeZone: getCurrentTimezoneOffset(),
      })
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}
