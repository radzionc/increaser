import { isProduction } from 'shared'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'
import { AmplitudeAnalytics } from '@increaser/ui/analytics/AmplitudeAnalytics'
import { LocalAnalytics } from '@increaser/ui/analytics/LocalAnalytics'

export const analytics = isProduction
  ? new AmplitudeAnalytics(
      shouldBeDefined(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY),
    )
  : new LocalAnalytics()
