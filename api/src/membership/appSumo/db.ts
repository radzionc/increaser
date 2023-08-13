import { documentClient } from '../../shared/db'
import { getUpdateParams } from '../../shared/db/getUpdateParams'
import { mergeParams } from '../../shared/db/mergeParams'
import { projectionExpression } from '../../shared/db/projectionExpression'
import { tableName } from '../../shared/db/tableName'
import { AppSumoCode } from './AppSumoCode'

export const getAppSumoCodeItemParams = (id: string) => ({
  TableName: tableName.appSumoCodes,
  Key: { id },
})

export async function getAppSumoCodeById<T extends (keyof AppSumoCode)[]>(
  id: string,
  attributes?: T,
): Promise<Pick<AppSumoCode, T[number]> | undefined> {
  const { Item } = await documentClient
    .get(
      mergeParams(
        getAppSumoCodeItemParams(id),
        projectionExpression(attributes),
      ),
    )
    .promise()

  return Item as Pick<AppSumoCode, T[number]>
}

export const updateAppSumoCode = (id: string, params: Partial<AppSumoCode>) => {
  return documentClient
    .update({
      ...getAppSumoCodeItemParams(id),
      ...getUpdateParams(params),
    })
    .promise()
}

export const deleteAppSumoCode = async (id: string) => {
  return documentClient
    .delete({
      ...getAppSumoCodeItemParams(id),
    })
    .promise()
}
