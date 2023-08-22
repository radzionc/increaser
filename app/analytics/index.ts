import * as amplitude from '@amplitude/analytics-browser'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'
import { memoize } from '@increaser/utils/memoize'

const initialize = memoize(() => {
  const key = shouldBeDefined(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY)

  amplitude.init(key)
})

export const trackEvent = (name: string, data?: Record<string, any>) => {
  if (process.env.NODE_ENV !== 'production') return

  initialize()

  amplitude.track(name, data)
}

export const setUserForTracking = (id: string) => {
  if (process.env.NODE_ENV !== 'production') return

  initialize()

  amplitude.setUserId(id)
}
