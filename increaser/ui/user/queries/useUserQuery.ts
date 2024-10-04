import { useApi } from '@increaser/api-ui/state/ApiContext'
import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { useQuery } from '@tanstack/react-query'

export const userStateQueryKey = ['userState4']

export const useUserQuery = () => {
  const api = useApi()

  return useQuery({
    queryKey: userStateQueryKey,
    queryFn: () => {
      console.log('query user')
      return api.call('user', {
        timeZone: getCurrentTimezoneOffset(),
      })
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}
