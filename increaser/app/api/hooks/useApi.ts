import {
  ApiInterface,
  ApiMethodName,
} from '@increaser/api-interface/ApiInterface'
import { useCallback } from 'react'
import { callApi } from '../utils/callApi'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { useAuthSession } from '@increaser/app/auth/hooks/useAuthSession'
import { ApiError } from '@increaser/api-interface/ApiError'

const baseUrl = shouldBeDefined(process.env.NEXT_PUBLIC_API_URL)

export const useApi = () => {
  const [authSession, setAuthSession] = useAuthSession()
  const authToken = authSession?.token

  const call = useCallback(
    async <M extends ApiMethodName>(
      method: M,
      input: ApiInterface[M]['input'],
    ) => {
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
          setAuthSession(undefined)
        }
        throw err
      }
    },
    [authToken, setAuthSession],
  )

  return { call } as const
}
