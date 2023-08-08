import { makeCurrentMonthReport } from './makeCurrentMonthReport'
import { AWSLambda } from '@sentry/serverless'

AWSLambda.init({
  dsn: process.env.SENTRY_KEY,
})

export const handler = AWSLambda.wrapHandler(makeCurrentMonthReport)
