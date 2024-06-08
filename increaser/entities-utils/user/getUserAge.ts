import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { differenceInYears } from 'date-fns'

export const getUserAge = (dob: string): number => {
  const dobDate = new Date(fromDay(stringToDay(dob)))
  const now = new Date()

  return differenceInYears(now, dobDate)
}
