import { PerformanceScoreboard } from '@increaser/entities/PerformanceScoreboard'
import { tableName } from './tableName'
import { makeGetItem } from '@increaser/dynamodb/makeGetItem'
import { updateItem } from '@increaser/dynamodb/updateItem'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '@increaser/dynamodb/client'
import { asyncAttempt } from '@increaser/utils/asyncAttempt'

export const getScoreboard = makeGetItem<string, PerformanceScoreboard>({
  tableName: tableName.scoreboards,
  getKey: (id: string) => ({ id }),
})

export const doesScoreboardExist = async (id: string) =>
  asyncAttempt(async () => Boolean(await getScoreboard(id, ['id'])), false)

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
