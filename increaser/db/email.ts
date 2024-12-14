import { Email } from '@increaser/entities/Email'
import { tableName } from './tableName'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '@lib/dynamodb/client'

export const putEmail = (email: Email) => {
  const command = new PutCommand({
    TableName: tableName.emails,
    Item: email,
  })

  return dbDocClient.send(command)
}
