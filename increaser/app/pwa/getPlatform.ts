import { memoize } from '@lib/utils/memoize'

import { Platform } from './Platform'

export const getPlatform = memoize((): Platform | null => {
  const navigator = window?.navigator
  if (!navigator) return null

  const { userAgent, appVersion } = navigator
  const platform =
    (navigator as any)?.userAgentData?.platform || navigator.platform

  if (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(platform)
  ) {
    return Platform.iOS
  }

  if (appVersion?.includes('Win')) {
    return Platform.Windows
  }
  if (appVersion?.includes('Mac')) {
    return Platform.Mac
  }
  if (userAgent?.includes('Android')) {
    return Platform.Android
  }
  if (appVersion?.includes('Linux')) {
    return Platform.Linux
  }

  return null
})
