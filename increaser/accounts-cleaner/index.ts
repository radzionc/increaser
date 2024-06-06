import { deleteInactiveAccounts } from './deleteInactiveAccounts'
import { AWSLambda } from '@sentry/serverless'

AWSLambda.init({
  dsn: process.env.SENTRY_KEY,
})

export const handler = AWSLambda.wrapHandler(deleteInactiveAccounts)
