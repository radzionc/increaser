/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@increaser/entities/User'
import { dbDocClient } from '@increaser/db/dbClient'
import { tableName } from '@increaser/db/tableName'

import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { getMonthStartedAt } from '@increaser/utils/getMonthStartedAt'
import { inTimeZone } from '@increaser/utils/inTimeZone'
import { MIN_IN_HOUR, MS_IN_DAY, S_IN_MIN } from '@increaser/utils/time'
import { getSetsDurationInSeconds } from '@increaser/entities-utils/set/getSetsDurationInSeconds'
import { uploadJsonToPublic } from '@increaser/public/uploadJsonToPublic'

interface UserRecord {
  dailyAvgInMinutes: number
  id: string
  name: string | undefined
  country: string | undefined
}

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
  const records: UserRecord[] = users
    .map(({ id, name, country, isAnonymous, sets, prevSets, timeZone }) => {
      const now = Date.now()
      const monthStartedAt = inTimeZone(getMonthStartedAt(now), timeZone)
      const allSets = [...sets, ...prevSets].filter(
        (set) => set.start > monthStartedAt,
      )
      const days = Math.ceil((now - monthStartedAt) / MS_IN_DAY)
      const total = getSetsDurationInSeconds(allSets)

      return {
        id,
        name: isAnonymous ? undefined : name,
        country: isAnonymous ? undefined : country,
        dailyAvgInMinutes: Math.round(total / days / S_IN_MIN),
      }
    })
    .sort((a, b) => b.dailyAvgInMinutes - a.dailyAvgInMinutes)
    .filter(({ dailyAvgInMinutes }) => dailyAvgInMinutes > 2 * MIN_IN_HOUR)

  const content = {
    createdAt: Date.now(),
    users: records,
  }

  await uploadJsonToPublic({
    content,
    path: 'month',
  })
}
