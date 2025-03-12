import { totalScan } from '@lib/dynamodb/totalScan'
import { order } from '@lib/utils/array/order'
import { omit } from '@lib/utils/record/omit'
import { MS_IN_MIN } from '@lib/utils/time'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  doesScoreboardExist,
  putScoreboard,
  updateScoreboard,
} from '@product/db/scoreboard'
import { tableName } from '@product/db/tableName'
import {
  PerformanceScoreboard,
  UserPerformanceRecord,
  scoreboardPeriodInDays,
  scoreboardPeriods,
} from '@product/entities/PerformanceScoreboard'
import { User } from '@product/entities/User'
import { getBlocks } from '@product/entities-utils/block'
import { getUserProfile } from '@product/entities-utils/scoreboard/getUserProfile'
import { getSetsDuration } from '@product/entities-utils/set/getSetsDuration'

type UserInfo = Pick<
  User,
  'id' | 'name' | 'country' | 'sets' | 'timeZone' | 'isAnonymous'
>

export const syncScoreboards = async () => {
  const users = await totalScan<UserInfo>({
    TableName: tableName.users,
    FilterExpression: 'size(#sets) > :size AND #lastVisitAt > :lastVisitAt',
    ExpressionAttributeNames: {
      '#id': 'id',
      '#sets': 'sets',
      '#name': 'name',
      '#timeZone': 'timeZone',
      '#country': 'country',
      '#isAnonymous': 'isAnonymous',
      '#lastVisitAt': 'lastVisitAt',
    },
    ExpressionAttributeValues: {
      ':size': 0,
      ':lastVisitAt':
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
        if (dailyAvgInMinutes < convertDuration(4, 'h', 'min')) return

        const blocks = getBlocks(scoreboardSets)

        const avgBlockInMinutes = totalInMinutes / blocks.length
        const userRecord: UserPerformanceRecord = {
          id,
          dailyAvgInMinutes,
          avgBlockInMinutes,
          profile: getUserProfile(user) || undefined,
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
