import { DynamoDB } from 'aws-sdk'

const config =
  process.env.NODE_ENV !== 'test'
    ? {}
    : {
        endpoint: process.env.DYNAMO_ENPOINT,
        region: 'mock',
        credentials: {
          accessKeyId: 'accessKeyId',
          secretAccessKey: 'secretAccessKey',
        },
      }

export const documentClient = new DynamoDB.DocumentClient(config)
