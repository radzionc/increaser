import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '@lib/dynamodb/client'
import { makeGetItem } from '@lib/dynamodb/makeGetItem'
import { updateItem } from '@lib/dynamodb/updateItem'
import { attempt, withFallback } from '@lib/utils/attempt'
import { PerformanceScoreboard } from '@product/entities/PerformanceScoreboard'

import { tableName } from './tableName'

export const getScoreboard = makeGetItem<string, PerformanceScoreboard>({
  tableName: tableName.scoreboards,
  getKey: (id: string) => ({ id }),
})

export const doesScoreboardExist = async (id: string) =>
  withFallback(
    attempt(async () => Boolean(await getScoreboard(id, ['id']))),
    false,
  )

export const updateScoreboard = async (
  id: string,
  fields: Partial<PerformanceScoreboard>,
) => {
  return updateItem({
    tableName: tableName.scoreboards,
    key: { id },
    fields,
  })
}

export const putScoreboard = (value: PerformanceScoreboard) => {
  const command = new PutCommand({
    TableName: tableName.scoreboards,
    Item: value,
  })

  return dbDocClient.send(command)
}
