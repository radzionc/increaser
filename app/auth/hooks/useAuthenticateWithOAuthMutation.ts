import { useMutation } from 'react-query'

import { useAuthSession } from './useAuthSession'
import { useApi } from 'api/hooks/useApi'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'

export const useAuthenticateWithOAuthMutation = () => {
  const api = useApi()

  const [, updateSession] = useAuthSession()

  return useMutation(
    async (input: ApiInterface['authSessionWithOAuth']['input']) => {
      const session = await api.call('authSessionWithOAuth', input)

      updateSession(session)
    },
  )
}
