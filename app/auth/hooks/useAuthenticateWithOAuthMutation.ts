import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'

import { useApi } from 'api/useApi'
import { AuthSessionWithOAuthInput } from '@increaser/api-interface/client/graphql'
import { useAuthSession } from './useAuthSession'

const authSessionWithOAuthDocument = graphql(`
  query authSessionWithOAuth($input: AuthSessionWithOAuthInput!) {
    authSessionWithOAuth(input: $input) {
      token
      expiresAt
      isFirst
    }
  }
`)

export const useAuthenticateWithOAuthMutation = () => {
  const { query } = useApi()

  const [, updateSession] = useAuthSession()

  return useMutation(async (input: AuthSessionWithOAuthInput) => {
    const { authSessionWithOAuth } = await query(authSessionWithOAuthDocument, {
      input,
    })

    updateSession(authSessionWithOAuth)
  })
}
