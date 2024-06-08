import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { setYear } from 'date-fns'

type Input = {
  value: string | number
  dob?: string | null
}

export const getGoalDeadlineTimestamp = ({ value, dob }: Input) => {
  if (typeof value === 'string') {
    return fromDay(stringToDay(value))
  }

  const dobTimestamp = fromDay(stringToDay(shouldBePresent(dob)))
  const dobYear = new Date(dobTimestamp).getFullYear()
  const year = dobYear + value

  return setYear(dobTimestamp, year).getTime()
}
