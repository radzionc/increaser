import { AWSLambda } from '@sentry/serverless'

import { syncScoreboards } from './syncScoreboards'

AWSLambda.init({
  dsn: process.env.SENTRY_KEY,
})

export const handler = AWSLambda.wrapHandler(syncScoreboards)
