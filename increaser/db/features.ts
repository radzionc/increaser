import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { ProductFeature } from '@increaser/entities/ProductFeature'
import { tableName } from './tableName'
import { dbDocClient } from '@lib/dynamodb/client'
import { totalScan } from '@lib/dynamodb/totalScan'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { makeGetItem } from '@lib/dynamodb/makeGetItem'
import { updateItem } from '@lib/dynamodb/updateItem'

export const putFeature = (value: ProductFeature) => {
  const command = new PutCommand({
    TableName: tableName.features,
    Item: value,
  })

  return dbDocClient.send(command)
}

export const getFeature = makeGetItem<string, ProductFeature>({
  tableName: tableName.features,
  getKey: (id: string) => ({ id }),
})

export const updateFeature = async (
  id: string,
  fields: Partial<ProductFeature>,
) => {
  return updateItem({
    tableName: tableName.features,
    key: { id },
    fields,
  })
}

export const getAllFeatures = async <T extends (keyof ProductFeature)[]>(
  attributes?: T,
) =>
  totalScan<Pick<ProductFeature, T[number]>>({
    TableName: tableName.features,
    ...getPickParams(attributes),
  })
