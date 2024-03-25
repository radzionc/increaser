import { haveEqualFields } from '../record/haveEqualFields'

export type Week = {
  year: number
  // week index starts from 0
  week: number
}

export const areSameWeek = <T extends Week>(a: T, b: T): boolean =>
  haveEqualFields(['year', 'week'], a, b)
