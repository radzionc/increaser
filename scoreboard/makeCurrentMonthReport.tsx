/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@increaser/entities/User'
import { dbDocClient } from '@increaser/db/dbClient'
import { tableName } from '@increaser/db/tableName'

import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { getMonthStartedAt } from '@increaser/utils/time/getMonthStartedAt'
import { inTimeZone } from '@increaser/utils/time/inTimeZone'
import { MIN_IN_HOUR, MS_IN_DAY, MS_IN_MIN } from '@increaser/utils/time'
import { uploadJsonToPublic } from '@increaser/public/uploadJsonToPublic'
import {
  PerformanceScoreboard,
  UserPerformanceRecord,
} from '@increaser/entities/PerformanceScoreboard'
import { getBlocks } from '@increaser/entities-utils/block'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'

type UserInfo = Pick<
  User,
  'id' | 'name' | 'country' | 'sets' | 'prevSets' | 'timeZone' | 'isAnonymous'
>

export const makeCurrentMonthReport = async () => {
  const users: UserInfo[] = []

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
        '#country': 'country',
        '#isAnonymous': 'isAnonymous',
      },
      ExpressionAttributeValues: {
        ':size': 0,
      },
      ProjectionExpression:
        '#id,#sets,#prevSets,#name,#timeZone,#country,#isAnonymous',
    })
    const { Items, LastEvaluatedKey } = await dbDocClient.send(command)
    if (Items) {
      users.push(...(Items as UserInfo[]))
    }

    if (LastEvaluatedKey) {
      await recursiveProcess(LastEvaluatedKey)
    }
  }
  await recursiveProcess()

  const records: UserPerformanceRecord[] = []

  users.forEach(
    ({ timeZone, sets, prevSets, id, isAnonymous, name, country }) => {
      const now = Date.now()
      const monthStartedAt = inTimeZone(getMonthStartedAt(now), timeZone)
      const allSets = [...sets, ...prevSets].filter(
        (set) => set.start > monthStartedAt,
      )
      const days = Math.ceil((now - monthStartedAt) / MS_IN_DAY)
      const total = getSetsDuration(allSets)
      const totalInMinutes = Math.round(total / MS_IN_MIN)

      const dailyAvgInMinutes = Math.round(totalInMinutes / days)
      if (dailyAvgInMinutes < 2 * MIN_IN_HOUR) return

      const blocks = getBlocks(allSets)

      const avgBlockInMinutes = totalInMinutes / blocks.length

      records.push({
        id,
        name: isAnonymous ? undefined : name,
        country: isAnonymous ? undefined : country,
        dailyAvgInMinutes,
        avgBlockInMinutes,
      })
    },
  )

  const content: PerformanceScoreboard = {
    createdAt: Date.now(),
    users: records,
  }

  await uploadJsonToPublic({
    content,
    path: 'month',
  })
}
