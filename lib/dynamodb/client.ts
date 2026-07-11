import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const isLocal = process.env.DYNAMODB_LOCAL === 'true'

const dbClient = new DynamoDBClient(
  isLocal
    ? {
        endpoint: 'http://localhost:8000',
        region: 'local',
        credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
      }
    : undefined,
)

export const dbDocClient = DynamoDBDocumentClient.from(dbClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
})
