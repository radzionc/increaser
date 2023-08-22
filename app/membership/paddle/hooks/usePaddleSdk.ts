import { reportError } from 'errors/errorMonitoring'
import { useQuery } from 'react-query'
import { createScript, getScriptBySrc, loadScript } from 'shared/utils/dom'

import { PaddleSdk } from '../PaddleSdk'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'

export const paddleQueryKey = 'paddle'
const paddleScriptSource = 'https://cdn.paddle.com/paddle/paddle.js'
const paddleVendorId = Number(
  shouldBeDefined(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
)

export const usePaddleSdk = () => {
  return useQuery(
    paddleQueryKey,
    async () => {
      if (!window.Paddle) {
        try {
          const paddleScript =
            getScriptBySrc(paddleScriptSource) ||
            createScript(paddleScriptSource)

          await loadScript(paddleScript)

          const paddleSdk = window.Paddle as unknown as PaddleSdk

          paddleSdk.Setup({ vendor: paddleVendorId })
        } catch (err) {
          reportError(err, { context: 'Failed to load PaddeSDK' })
        }
      }

      return window.Paddle as PaddleSdk
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    },
  )
}
