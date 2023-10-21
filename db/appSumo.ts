import { DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb'
import { tableName } from '@increaser/db/tableName'
import { AppSumoCode } from '@increaser/entities/AppSumoCode'

import { dbDocClient } from '@increaser/dynamodb/client'
import { getPickParams } from '@increaser/dynamodb/getPickParams'
import { updateItem } from '@increaser/dynamodb/updateItem'

export const getAppSumoCodeItemParams = (id: string) => ({
  TableName: tableName.appSumoCodes,
  Key: { id },
})

export async function getAppSumoCodeById<T extends (keyof AppSumoCode)[]>(
  id: string,
  attributes?: T,
): Promise<Pick<AppSumoCode, T[number]> | undefined> {
  const command = new GetCommand({
    ...getAppSumoCodeItemParams(id),
    ...getPickParams(attributes),
  })

  const { Item } = await dbDocClient.send(command)

  return Item as Pick<AppSumoCode, T[number]>
}

export const updateAppSumoCode = (id: string, fields: Partial<AppSumoCode>) => {
  return updateItem({
    tableName: tableName.appSumoCodes,
    key: { id },
    fields,
  })
}

export const deleteAppSumoCode = async (id: string) => {
  const command = new DeleteCommand(getAppSumoCodeItemParams(id))

  return dbDocClient.send(command)
}
