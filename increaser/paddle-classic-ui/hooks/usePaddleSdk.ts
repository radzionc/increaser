import { useQuery } from '@tanstack/react-query'
import { createScript, getScriptBySrc, loadScript } from '@lib/ui/dom/script'

import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { PaddleSdk } from '../PaddleSdk'

const paddleQueryKey = ['paddle']

const paddleScriptSource = 'https://cdn.paddle.com/paddle/paddle.js'

const paddleVendorId = Number(
  shouldBeDefined(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
)

declare global {
  interface Window {
    Paddle?: PaddleSdk
  }
}

export const usePaddleSdk = () => {
  return useQuery({
    queryKey: paddleQueryKey,
    queryFn: async () => {
      if (!window.Paddle) {
        const paddleScript =
          getScriptBySrc(paddleScriptSource) || createScript(paddleScriptSource)

        await loadScript(paddleScript)

        const paddleSdk = window.Paddle as unknown as PaddleSdk

        paddleSdk.Setup({ vendor: paddleVendorId })
      }

      return window.Paddle as PaddleSdk
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    meta: {
      disablePersist: true,
    },
  })
}
