import { DeleteCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { tableName } from '@increaser/db/tableName'
import { AppSumoCode } from '@increaser/entities/AppSumoCode'
import { getUpdateParams } from './utils/getUpdateParams'
import { mergeParams } from './utils/mergeParams'
import { projectionExpression } from './utils/projectionExpression'
import { dbDocClient } from './dbClient'

export const getAppSumoCodeItemParams = (id: string) => ({
  TableName: tableName.appSumoCodes,
  Key: { id },
})

export async function getAppSumoCodeById<T extends (keyof AppSumoCode)[]>(
  id: string,
  attributes?: T,
): Promise<Pick<AppSumoCode, T[number]> | undefined> {
  const command = new GetCommand(
    mergeParams(getAppSumoCodeItemParams(id), projectionExpression(attributes)),
  )

  const { Item } = await dbDocClient.send(command)

  return Item as Pick<AppSumoCode, T[number]>
}

export const updateAppSumoCode = (id: string, params: Partial<AppSumoCode>) => {
  const command = new UpdateCommand({
    ...getAppSumoCodeItemParams(id),
    ...getUpdateParams(params),
  })
  return dbDocClient.send(command)
}

export const deleteAppSumoCode = async (id: string) => {
  const command = new DeleteCommand(getAppSumoCodeItemParams(id))

  return dbDocClient.send(command)
}
