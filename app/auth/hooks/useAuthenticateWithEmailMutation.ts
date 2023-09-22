import { graphql } from '@increaser/api-interface/client'
import { useMutation } from 'react-query'

import { useApi } from 'api/useApi'
import { AuthSessionWithEmailInput } from '@increaser/api-interface/client/graphql'
import { useAuthSession } from './useAuthSession'

const authSessionWithEmailDocument = graphql(`
  query authSessionWithEmail($input: AuthSessionWithEmailInput!) {
    authSessionWithEmail(input: $input) {
      token
      expiresAt
      isFirst
    }
  }
`)

export const useAuthenticateWithEmailMutation = () => {
  const { query } = useApi()

  const [, updateSession] = useAuthSession()

  return useMutation(async (input: AuthSessionWithEmailInput) => {
    const { authSessionWithEmail } = await query(authSessionWithEmailDocument, {
      input,
    })

    updateSession(authSessionWithEmail)
  })
}
