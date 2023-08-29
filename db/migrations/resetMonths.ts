import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '../dbClient'
import { tableName } from '../tableName'
import { projectionExpression } from '../utils/projectionExpression'
import { User } from '@increaser/entities/User'
import { updateUser } from '../user'
import { organizeWeeks } from '../../data-services/sets/organizeWeeks'
import { inTimeZone } from '@increaser/utils/time/inTimeZone'
import { getMonthStartedAt } from '@increaser/utils/time/getMonthStartedAt'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recursiveProcess = async (lastEvaluatedKey?: any) => {
  const command = new ScanCommand({
    ExclusiveStartKey: lastEvaluatedKey,
    TableName: tableName.users,
    ...projectionExpression(['id', 'projects', 'timeZone']),
  })
  const { Items, LastEvaluatedKey } = await dbDocClient.send(command)

  const users = Items as Pick<User, 'id' | 'projects' | 'timeZone'>[]

  const usersToUpdate = users.filter((user) => user.projects?.length > 0)

  await Promise.all(
    usersToUpdate.map(async (user) => {
      await organizeWeeks(user.id)

      const lastSyncedMonthEndedAt = inTimeZone(
        getMonthStartedAt(Date.now()),
        user.timeZone,
      )
      await updateUser(user.id, {
        projects: user.projects.map((project) => ({ ...project, months: [] })),
        prevSets: [],
        lastSyncedMonthEndedAt,
      })
    }),
  )
  if (LastEvaluatedKey) {
    await recursiveProcess(LastEvaluatedKey)
  }
}

recursiveProcess()
