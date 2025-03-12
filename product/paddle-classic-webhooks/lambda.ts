import { AWSLambda } from '@sentry/serverless'
import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'

import { getEnvVar } from './utils/getEnvVar'
import { handlePaddleClassicEvent } from './utils/handlePaddleClassicEvent'
import { parsePaddleClassicEvent } from './utils/parsePaddleClassicEvent'

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>

AWSLambda.init({
  dsn: getEnvVar('SENTRY_KEY'),
})

const paddleClassicEventsHandler: ProxyHandler = async ({ body }) => {
  if (!body) {
    console.log('Received empty body from Paddle Classic')
    return {
      statusCode: 400,
    }
  }

  console.log(`Received encoded event from Paddle Classic: ${body}`)
  const event = parsePaddleClassicEvent(body)
  console.log(`Parsed event from Paddle Classic: ${JSON.stringify(event)}`)

  await handlePaddleClassicEvent(event)

  return {
    statusCode: 200,
  }
}

export const handler = AWSLambda.wrapHandler(paddleClassicEventsHandler)
