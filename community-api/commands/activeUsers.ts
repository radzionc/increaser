/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@increaser/entities/User'
import { dbDocClient } from '@increaser/db/dbClient'
import { tableName } from '@increaser/db/tableName'

import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { getMonthStartedAt } from '@increaser/utils/getMonthStartedAt'
import { inTimeZone } from '@increaser/utils/inTimeZone'
import { MS_IN_DAY, S_IN_HOUR } from '@increaser/utils/time'
import { getSetsDurationInSeconds } from '@increaser/entities-utils/set/getSetsDurationInSeconds'

interface UserInfo {
  dailyAvg: number
  id: string
  name: string | undefined
}

const activeUsers = async () => {
  const users: Pick<User, 'id' | 'name' | 'sets' | 'prevSets' | 'timeZone'>[] =
    []

  const recursiveProcess = async (lastEvaluatedKey?: any) => {
    const command = new ScanCommand({
      ExclusiveStartKey: lastEvaluatedKey,
      TableName: tableName.users,
      FilterExpression: 'size(#sets) > :size or size(#prevSets) > :size',
      ExpressionAttributeNames: {
        '#id': 'id',
        '#sets': 'sets',
        '#prevSets': 'prevSets',
        '#name': 'name',
        '#timeZone': 'timeZone',
      },
      ExpressionAttributeValues: {
        ':size': 0,
      },
      ProjectionExpression: '#id, #sets, #prevSets, #name, #timeZone',
    })
    const { Items, LastEvaluatedKey } = await dbDocClient.send(command)
    if (Items) {
      users.push(
        ...(Items as Pick<
          User,
          'id' | 'name' | 'sets' | 'prevSets' | 'timeZone'
        >[]),
      )
    }

    if (LastEvaluatedKey) {
      await recursiveProcess(LastEvaluatedKey)
    }
  }
  await recursiveProcess()
  const info: UserInfo[] = users
    .map(({ id, name, sets, prevSets, timeZone }) => {
      const now = Date.now()
      const monthStartedAt = inTimeZone(getMonthStartedAt(now), timeZone)
      const allSets = [...sets, ...prevSets].filter(
        (set) => set.start > monthStartedAt,
      )
      const days = Math.ceil((now - monthStartedAt) / MS_IN_DAY)
      const total = getSetsDurationInSeconds(allSets)

      return {
        id,
        name,
        dailyAvg: total / days / S_IN_HOUR,
      }
    })
    .sort((a, b) => a.dailyAvg - b.dailyAvg)
    .filter(({ dailyAvg }) => dailyAvg > 3)

  console.log(info)
}

activeUsers()
