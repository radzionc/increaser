import { ChildrenProp } from '@lib/ui/props'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { ApiError } from '@product/api-interface/ApiError'
import { ApiContext, CallApi } from '@product/api-ui/state/ApiContext'
import { callApi } from '@product/api-ui/utils/callApi'
import { useCallback } from 'react'

import { useAuthSession } from '../auth/hooks/useAuthSession'

const baseUrl = shouldBeDefined(process.env.NEXT_PUBLIC_API_URL)

export const ApiProvider = ({ children }: ChildrenProp) => {
  const [authSession, setAuthSession] = useAuthSession()
  const authToken = authSession?.token

  const call: CallApi = useCallback(
    async (method, input) => {
      try {
        const result = await callApi({
          baseUrl,
          method,
          input,
          authToken,
        })

        return result
      } catch (err) {
        if (err instanceof ApiError && err.id === 'invalidAuthToken') {
          setAuthSession(null)
        }
        throw err
      }
    },
    [authToken, setAuthSession],
  )

  return <ApiContext.Provider value={{ call }}>{children}</ApiContext.Provider>
}
