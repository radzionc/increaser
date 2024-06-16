import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { setYear } from 'date-fns'

type Input = {
  deadlineAt: string | number
  dob?: string | null
}

export const getGoalDeadlineTimestamp = ({ deadlineAt, dob }: Input) => {
  if (typeof deadlineAt === 'string') {
    return fromDay(stringToDay(deadlineAt))
  }

  const dobTimestamp = fromDay(stringToDay(shouldBePresent(dob)))
  const dobYear = new Date(dobTimestamp).getFullYear()
  const year = dobYear + deadlineAt

  return setYear(dobTimestamp, year).getTime()
}
