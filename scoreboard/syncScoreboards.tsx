import { User } from '@increaser/entities/User'
import { tableName } from '@increaser/db/tableName'

import { MIN_IN_HOUR, MS_IN_MIN } from '@increaser/utils/time'
import {
  PerformanceScoreboard,
  UserPerformanceRecord,
  scoreboardPeriodInDays,
  scoreboardPeriods,
} from '@increaser/entities/PerformanceScoreboard'
import { getBlocks } from '@increaser/entities-utils/block'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import {
  doesScoreboardExist,
  putScoreboard,
  updateScoreboard,
} from '@increaser/db/scoreboard'
import { omit } from '@increaser/utils/record/omit'
import { order } from '@increaser/utils/array/order'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { getUserProfile } from '@increaser/entities-utils/scoreboard/getUserProfile'
import { totalScan } from '@increaser/dynamodb/totalScan'

type UserInfo = Pick<
  User,
  'id' | 'name' | 'country' | 'sets' | 'timeZone' | 'isAnonymous'
>

export const syncScoreboards = async () => {
  const users = await totalScan<UserInfo>({
    TableName: tableName.users,
    FilterExpression: 'size(#sets) > :size AND #updatedAt > :updatedAt',
    ExpressionAttributeNames: {
      '#id': 'id',
      '#sets': 'sets',
      '#name': 'name',
      '#timeZone': 'timeZone',
      '#country': 'country',
      '#isAnonymous': 'isAnonymous',
      '#updatedAt': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':size': 0,
      ':updatedAt':
        Date.now() -
        convertDuration(
          Math.max(...Object.values(scoreboardPeriodInDays)),
          'd',
          'ms',
        ),
    },
    ProjectionExpression: '#id,#sets,#name,#timeZone,#country,#isAnonymous',
  })

  const records: UserPerformanceRecord[] = []
  await Promise.all(
    scoreboardPeriods.map(async (period) => {
      users.forEach((user) => {
        const { sets, id } = user
        const days = scoreboardPeriodInDays[period]
        const setsShouldStartForm =
          Date.now() - convertDuration(days, 'd', 'ms')
        const scoreboardSets = sets.filter(
          (set) => set.start > setsShouldStartForm,
        )
        const total = getSetsDuration(scoreboardSets)
        const totalInMinutes = Math.round(total / MS_IN_MIN)

        const dailyAvgInMinutes = Math.round(totalInMinutes / days)
        if (dailyAvgInMinutes < 2 * MIN_IN_HOUR) return

        const blocks = getBlocks(scoreboardSets)

        const avgBlockInMinutes = totalInMinutes / blocks.length
        const userRecord: UserPerformanceRecord = {
          id,
          dailyAvgInMinutes,
          avgBlockInMinutes,
          profile: getUserProfile(user),
        }

        records.push(userRecord)
      })

      const content: PerformanceScoreboard = {
        id: period,
        syncedAt: Date.now(),
        users: order(records, (r) => r.dailyAvgInMinutes, 'desc'),
      }

      if (await doesScoreboardExist(content.id)) {
        await updateScoreboard(content.id, omit(content, 'id'))
      } else {
        await putScoreboard(content)
      }
    }),
  )
}
