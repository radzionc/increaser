import { getUser, updateUser } from '@increaser/db/user'
import { organizeWeeks } from './organizeWeeks'
import { User } from '@increaser/entities/User'
import { organizeMonths } from './organizeMonths'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
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
