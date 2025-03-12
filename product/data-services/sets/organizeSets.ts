import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { getUser, updateUser } from '@product/db/user'
import { User } from '@product/entities/User'

import { organizeMonths } from './organizeMonths'
import { organizeWeeks } from './organizeWeeks'
import { organizeYears } from './organizeYears'

export const organizeSets = async (userId: string) => {
  const user = await getUser(userId, [
    'sets',
    'timeZone',
    'projects',
    'weeks',
    'months',
    'years',
    'lastSyncedWeekEndedAt',
    'lastSyncedMonthEndedAt',
    'lastSyncedYear',
  ])

  const fields: Partial<User> = [
    organizeWeeks,
    organizeMonths,
    organizeYears,
  ].reduce(
    (acc, organize) => ({ ...acc, ...organize({ ...user, ...acc }) }),
    {},
  )

  if (!isRecordEmpty(fields)) {
    await updateUser(userId, fields)
  }
}
