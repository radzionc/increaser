import { Email } from '@increaser/entities/Email'
import { tableName } from './tableName'
import { DeleteCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { dbDocClient } from '@lib/dynamodb/client'
import { updateItem } from '@lib/dynamodb/updateItem'
import { makeGetItem } from '@lib/dynamodb/makeGetItem'
import { totalScan } from '@lib/dynamodb/totalScan'

export const getEmailItemParams = (id: string) => ({
  TableName: tableName.emails,
  Key: {
    id,
  },
})

export const getEmail = makeGetItem<string, Email>({
  tableName: tableName.emails,
  getKey: (id: string) => ({ id }),
})

export const updateEmail = async (id: string, fields: Partial<Email>) => {
  return updateItem({
    tableName: tableName.emails,
    key: { id },
    fields,
  })
}

export const deleteEmail = (id: string) => {
  const command = new DeleteCommand(getEmailItemParams(id))

  return dbDocClient.send(command)
}

export const getNumberOfEmails = async () => {
  const command = new DescribeTableCommand({
    TableName: tableName.emails,
  })

  const tableInfo = await dbDocClient.send(command)

  return shouldBeDefined(tableInfo.Table?.ItemCount)
}

export const putEmail = (email: Email) => {
  const command = new PutCommand({
    TableName: tableName.emails,
    Item: email,
  })

  return dbDocClient.send(command)
}

export const getAllEmails = async <T extends (keyof Email)[]>(
  attributes: T,
) => {
  return totalScan<Pick<Email, T[number]>>({
    TableName: tableName.emails,
    ...getPickParams(attributes),
  })
}
