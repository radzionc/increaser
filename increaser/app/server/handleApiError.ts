import * as Sentry from '@sentry/nextjs'

export class NoInternetError extends Error {}

interface HandleApiErrorParameters {
  error: any
  info?: Record<string, any>
}

const MESSAGES_TO_IGNORE = [
  'The network connection was lost',
  'Failed to fetch',
]

export const handleApiError = ({
  error,
  info = {},
}: HandleApiErrorParameters) => {
  if (MESSAGES_TO_IGNORE.some((message) => error?.message?.includes(message))) {
    return
  }

  Sentry.withScope((scope) => {
    Object.entries(info).forEach(([key, value]) => {
      scope.setExtra(key, value)
    })

    const errors = Array.isArray(error) ? error : [error]
    errors.forEach((err) => {
      if (err instanceof NoInternetError) return

      Sentry.captureException(err)
    })
  })
}
