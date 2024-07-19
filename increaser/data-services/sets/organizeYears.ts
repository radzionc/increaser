import { User } from '@increaser/entities/User'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { recordFilter } from '@lib/utils/record/recordFilter'
import { stringToMonth } from '@lib/utils/time/Month'

type UserFields = Pick<User, 'months' | 'timeZone' | 'years' | 'lastSyncedYear'>

export const organizeYears = ({
  timeZone,
  lastSyncedYear,
  months,
  years,
}: UserFields): Partial<UserFields> => {
  const currentYear = new Date(inTimeZone(Date.now(), timeZone)).getFullYear()
  const previousYear = currentYear - 1

  if (lastSyncedYear && previousYear <= lastSyncedYear) {
    return {}
  }

  const unsyncedMonths = recordFilter(months, ({ key }) => {
    const { year } = stringToMonth(key)
    if (year >= currentYear) {
      return false
    }

    if (!lastSyncedYear) {
      return true
    }

    return year > lastSyncedYear
  })

  if (!unsyncedMonths.length) {
    return {}
  }

  const newYears = { ...years }
  Object.entries(unsyncedMonths).forEach(([month, monthData]) => {
    const { year } = stringToMonth(month)
    const periodKey = year.toString()

    if (!newYears[periodKey]) {
      newYears[periodKey] = {}
    }

    Object.entries(monthData).forEach(([projectId, seconds]) => {
      newYears[periodKey] = {
        ...newYears[periodKey],
        [projectId]: (newYears[periodKey][projectId] ?? 0) + seconds,
      }
    })
  })

  return {
    years: newYears,
    lastSyncedYear: previousYear,
  }
}
