import { totalScan } from '@lib/dynamodb/totalScan'
import { User } from '@increaser/entities/User'
import { tableName } from '../tableName'
import { updateUser } from '../user'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { dayMomentsDefaultValues } from '@increaser/entities/DayMoments'

type OldUser = {
  id: string
  goalToWakeUpAt?: number
  goalToStartWorkAt?: number
  goalToFinishWorkBy?: number
  goalToGoToBedAt?: number
  firstMealStartsAt?: number
  lastMealStartsAt?: number
}

const migrate = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams([
      'id',
      'goalToWakeUpAt',
      'goalToStartWorkAt',
      'goalToFinishWorkBy',
      'goalToGoToBedAt',
      'firstMealStartsAt',
      'lastMealStartsAt',
    ]),
  })

  await Promise.all(
    users.map((user) => {
      return updateUser(user.id, {
        goalToWakeUpAt: undefined,
        goalToStartWorkAt: undefined,
        goalToFinishWorkBy: undefined,
        goalToGoToBedAt: undefined,
        firstMealStartsAt: undefined,
        lastMealStartsAt: undefined,
        wakeUpAt: user.goalToWakeUpAt ?? dayMomentsDefaultValues.wakeUpAt,
        startWorkAt:
          user.goalToStartWorkAt ?? dayMomentsDefaultValues.startWorkAt,
        finishWorkAt:
          user.goalToFinishWorkBy ?? dayMomentsDefaultValues.finishWorkAt,
        goToBedAt: user.goalToGoToBedAt ?? dayMomentsDefaultValues.goToBedAt,
        firstMealAt:
          user.firstMealStartsAt ?? dayMomentsDefaultValues.firstMealAt,
        lastMealAt: user.lastMealStartsAt ?? dayMomentsDefaultValues.lastMealAt,
      } as Partial<User>)
    }),
  )
}

migrate()
