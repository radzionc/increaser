import { trackEvent } from 'analytics'
import { useMainApi } from 'api/hooks/useMainApi'
import { AuthDestination } from 'auth/components/AuthFlow/AuthFlowContext'
import { IdentificationQueryResult } from 'auth/IdentificationQueryResult'
import { useMutation } from 'react-query'
import { Path } from 'router/Path'

import { useAuth } from './useAuth'
import { useRouter } from 'next/router'

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

      if (destination === AuthDestination.AppSumo) {
        router.push(Path.AppSumo)
      } else {
        if (firstIdentification) {
          trackEvent('Finish Sign Up')
        }

        router.push(Path.Home)
      }
    },
  )
}
