import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { updateUser } from '../user'
import { convertDuration } from '@lib/utils/time/convertDuration'

type OldUser = {
  id: string
  weekTimeAllocation: number[]
}

const setWorkingDays = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams(['id', 'weekTimeAllocation']),
  })

  await Promise.all(
    users.map((user) => {
      const [workdayHours, weekendHours] = user.weekTimeAllocation
        .slice(1, -1)
        .map((min) => convertDuration(min, 'min', 'h'))

      return updateUser(user.id, {
        workdayHours,
        weekendHours,
      })
    }),
  )
}

setWorkingDays()
