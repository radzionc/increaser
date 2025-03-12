import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { useApi } from '@product/api-ui/state/ApiContext'
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
