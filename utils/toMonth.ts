import { getMonth, getYear, startOfMonth } from 'date-fns'
import { Month } from './Month'

export const toMonth = (timestamp: number): Month => {
  const date = startOfMonth(new Date(timestamp))

  return {
    year: getYear(date),
    month: getMonth(date) + 1,
  }
}
