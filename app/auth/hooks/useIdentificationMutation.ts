import { trackEvent } from 'analytics'
import { useMainApi } from 'api/hooks/useMainApi'
import { IdentificationQueryResult } from 'auth/IdentificationQueryResult'
import { useMutation } from 'react-query'

import { useAuth } from './useAuth'

interface IdentificationQueryParams {
  query: string
  variables?: Record<string, any>
}

interface IdentificationMutationInput {
  queryParams: IdentificationQueryParams
}

export const useIdentificationMutation = () => {
  const { query } = useMainApi()
  const { updateSession } = useAuth()

  return useMutation(async ({ queryParams }: IdentificationMutationInput) => {
    const { token, tokenExpirationTime, firstIdentification } =
      await query<IdentificationQueryResult>(queryParams)

    updateSession({ token, tokenExpirationTime })
    analytics.trackEvent('Finish identification')

    if (firstIdentification) {
      analytics.trackEvent('Finish Sign Up')
    }
  })
}
