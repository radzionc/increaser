import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'

import { analytics } from 'analytics'
import { useApi } from 'api/useApi'
import { IdentifyWithEmailInput } from '@increaser/api-interface/client/graphql'
import { useAuth } from 'auth/components/AuthProvider'

const identifyWithEmailQueryDocument = graphql(`
  query identifyWithEmail($input: IdentifyWithEmailInput!) {
    identifyWithEmail(input: $input) {
      email
      name
      token
      tokenExpirationTime
      id
      firstIdentification
    }
  }
`)

export const useIdentifyWithEmailMutation = () => {
  const { query } = useApi()
  const { updateSession } = useAuth()

  return useMutation(async (input: IdentifyWithEmailInput) => {
    const {
      identifyWithEmail: { token, tokenExpirationTime, firstIdentification },
    } = await query(identifyWithEmailQueryDocument, { input })

    updateSession({ token, tokenExpirationTime })
    analytics.trackEvent('Finish identification')

    if (firstIdentification) {
      analytics.trackEvent('Finish Sign Up')
    }
  })
}
