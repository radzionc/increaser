import { useMutation } from 'react-query'

import { useAuthSession } from './useAuthSession'
import { useApi } from 'api/hooks/useApi'
import { ApiInterface } from '@increaser/api-interface/ApiInterface'

export const useAuthenticateWithEmailMutation = () => {
  const api = useApi()

  const [, updateSession] = useAuthSession()

  return useMutation(
    async (input: ApiInterface['authSessionWithEmail']['input']) => {
      const session = await api.call('authSessionWithEmail', input)

      updateSession(session)
    },
  )
}
