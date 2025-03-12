import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { differenceInYears } from 'date-fns'

type Input = {
  dob: string
  at: number
}

export const getUserAgeAt = ({ dob, at }: Input): number => {
  const dobDate = new Date(fromDay(stringToDay(dob)))

  return differenceInYears(at, dobDate)
}
