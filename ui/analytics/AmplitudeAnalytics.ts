import { Analytics } from './Analytics'
import * as amplitude from '@amplitude/analytics-browser'

export class AmplitudeAnalytics implements Analytics {
  constructor(apiKey: string) {
    amplitude.init(apiKey)
  }

  setUser(id: string) {
    amplitude.setUserId(id)
  }

  trackEvent(name: string, data?: Record<string, any>) {
    amplitude.track(name, data)
  }
}
