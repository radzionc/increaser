import { haveEqualFields } from '../record/haveEqualFields'
import { getMonth, getYear, startOfMonth } from 'date-fns'

export type Month = {
  year: number
  month: number
}

export const areSameMonth = <T extends Month>(a: T, b: T): boolean =>
  haveEqualFields(['year', 'month'], a, b)

export const toMonth = (timestamp: number): Month => {
  const date = startOfMonth(new Date(timestamp))

  return {
    year: getYear(date),
    month: getMonth(date) + 1,
  }
}

export const fromMonth = ({ year, month }: Month): number => {
  const date = new Date(year, month - 1, 1)

  return startOfMonth(date).getTime()
}

export const monthToString = ({ year, month }: Month): string =>
  [month, year].join('-')

export const stringToMonth = (str: string): Month => {
  const [month, year] = str.split('-').map(Number)

  return { month, year }
}

export const shortMonthsNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
