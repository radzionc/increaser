import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useAuthSession } from '../auth/hooks/useAuthSession'

import { callApi } from '@increaser/api-ui/utils/callApi'
import { useCallback } from 'react'
import { ApiError } from '@increaser/api-interface/ApiError'
import { ApiContext, CallApi } from '@increaser/api-ui/state/ApiContext'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'

const baseUrl = shouldBeDefined(process.env.NEXT_PUBLIC_API_URL)

export const ApiProvider = ({ children }: ComponentWithChildrenProps) => {
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
