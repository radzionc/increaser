import { isProduction } from '@product/app/shared'

export const setUserIdForErrorMonitoring = (userId: string) => {
  if (!isProduction) return

  console.log('setUserIdForErrorMonitoring', userId)
}

export const reportError = (error: any, extra: Record<string, string> = {}) => {
  console.log('reportError', error, extra)
}
