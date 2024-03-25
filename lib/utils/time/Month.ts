import { haveEqualFields } from '../record/haveEqualFields'

export interface Month {
  year: number
  month: number
}

export const areSameMonth = <T extends Month>(a: T, b: T): boolean =>
  haveEqualFields(['year', 'month'], a, b)
