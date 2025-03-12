import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '@lib/dynamodb/client'
import { Email } from '@product/entities/Email'

import { tableName } from './tableName'

export const putEmail = (email: Email) => {
  const command = new PutCommand({
    TableName: tableName.emails,
    Item: email,
  })

  return dbDocClient.send(command)
}
