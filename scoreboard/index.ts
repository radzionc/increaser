import { syncScoreboards } from './syncScoreboards'
import { AWSLambda } from '@sentry/serverless'

AWSLambda.init({
  dsn: process.env.SENTRY_KEY,
})

export const handler = AWSLambda.wrapHandler(syncScoreboards)
