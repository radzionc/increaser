import { totalScan } from '@lib/dynamodb/totalScan'
import { User, Set } from '@increaser/entities/User'
import { tableName } from '../tableName'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { MS_IN_WEEK } from '@lib/utils/time'
import { updateUser } from '../user'

type OldUser = User & {
  prevSets: Set[]
}

const migrate = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    FilterExpression: 'size(prevSets) > :size',
    ExpressionAttributeValues: {
      ':size': 0,
    },
  })

  await Promise.all(
    users.map((user) => {
      const lastSyncedWeekEndedAt = inTimeZone(
        getWeekStartedAt(getLastItem(user.prevSets).end) + MS_IN_WEEK,
        user.timeZone,
      )
      return updateUser(user.id, {
        lastSyncedWeekEndedAt,
        sets: [...user.prevSets, ...user.sets],
      })
    }),
  )
}

migrate()
