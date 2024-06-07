import { deleteInactiveAccounts } from './deleteInactiveAccounts'
import { AWSLambda } from '@sentry/serverless'
import { getEnvVar } from './getEnvVar'

AWSLambda.init({
  dsn: getEnvVar('SENTRY_KEY'),
})

export const handler = AWSLambda.wrapHandler(deleteInactiveAccounts)
