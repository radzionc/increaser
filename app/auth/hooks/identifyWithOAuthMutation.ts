import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'

import { useAuth } from './useAuth'
import { analytics } from 'analytics'
import { useApi } from 'api/useApi'
import { IdentifyWithOAuthInput } from '@increaser/api-interface/client/graphql'

const identifyWithOAuthQueryDocument = graphql(`
  query identifyWithOAuth($input: IdentifyWithOAuthInput!) {
    identifyWithOAuth(input: $input) {
      email
      name
      token
      tokenExpirationTime
      id
      firstIdentification
    }
  }
`)

export const useIdentifyWithOAuthMutation = () => {
  const { query } = useApi()
  const { updateSession } = useAuth()

  return useMutation(async (input: IdentifyWithOAuthInput) => {
    const {
      identifyWithOAuth: { token, tokenExpirationTime, firstIdentification },
    } = await query(identifyWithOAuthQueryDocument, { input })

    updateSession({ token, tokenExpirationTime })
    analytics.trackEvent('Finish identification')

    if (firstIdentification) {
      analytics.trackEvent('Finish Sign Up')
    }
  })
}
