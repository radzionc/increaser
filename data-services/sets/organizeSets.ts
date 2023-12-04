import { getUser, updateUser } from '@increaser/db/user'
import { organizeWeeks } from './organizeWeeks'
import { User } from '@increaser/entities/User'
import { organizeMonths } from './organizeMonths'
import { isRecordEmpty } from '@increaser/utils/record/isRecordEmpty'

export const organizeSets = async (userId: string) => {
  const user = await getUser(userId, [
    'sets',
    'timeZone',
    'projects',
    'lastSyncedWeekEndedAt',
    'lastSyncedMonthEndedAt',
  ])

  const fields: Partial<User> = [organizeWeeks, organizeMonths].reduce(
    (acc, organize) => ({ ...acc, ...organize({ ...user, ...acc }) }),
    {},
  )

  if (!isRecordEmpty(fields)) {
    await updateUser(userId, fields)
  }
}
