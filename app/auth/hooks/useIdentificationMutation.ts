import { trackEvent } from 'analytics'
import { useMainApi } from 'api/hooks/useMainApi'
import { IdentificationQueryResult } from 'auth/IdentificationQueryResult'
import { useMutation } from 'react-query'
import { Path } from 'router/Path'

import { useAuth } from './useAuth'
import { useRouter } from 'next/router'
import { AuthDestination } from 'auth/AuthDestination'

interface IdentificationQueryParams {
  query: string
  variables?: Record<string, any>
}

interface IdentificationMutationInput {
  queryParams: IdentificationQueryParams
  destination: AuthDestination
}

export const useIdentificationMutation = () => {
  const { query } = useMainApi()
  const { updateSession } = useAuth()
  const router = useRouter()

  return useMutation(
    async ({ queryParams, destination }: IdentificationMutationInput) => {
      const { token, tokenExpirationTime, firstIdentification } =
        await query<IdentificationQueryResult>(queryParams)

      updateSession({ token, tokenExpirationTime })
      trackEvent('Finish identification')

      if (firstIdentification) {
        trackEvent('Finish Sign Up')
      }

      if (destination === AuthDestination.AppSumo) {
        router.push(Path.AppSumo)
      } else {
        router.push(Path.Home)
      }
    },
  )
}
