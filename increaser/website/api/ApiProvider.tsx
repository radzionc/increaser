import { ChildrenProp } from '@lib/ui/props'

import { callApi } from '@increaser/api-ui/utils/callApi'
import { useCallback } from 'react'
import { ApiContext, CallApi } from '@increaser/api-ui/state/ApiContext'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'

const baseUrl = shouldBeDefined(process.env.NEXT_PUBLIC_API_URL)

export const ApiProvider = ({ children }: ChildrenProp) => {
  const call: CallApi = useCallback(async (method, input) => {
    const result = await callApi({
      baseUrl,
      method,
      input,
    })

    return result
  }, [])

  return <ApiContext.Provider value={{ call }}>{children}</ApiContext.Provider>
}
