import { isProduction } from '@product/app/shared'
import * as Sentry from '@sentry/nextjs'

export const setUserIdForErrorMonitoring = (userId: string) => {
  if (!isProduction) return

  Sentry.withScope((scope) => {
    scope.setUser({ id: userId })
  })
}

export const reportError = (error: any, extra: Record<string, string> = {}) => {
  console.log('reportError', error, extra)
  Sentry.withScope((scope) => {
    Object.entries(extra).forEach(([key, value]) => {
      scope.setExtra(key, value)
    })
    Sentry.captureException(error)
  })
}
