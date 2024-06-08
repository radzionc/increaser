import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { format } from 'date-fns'

export const formatGoalDeadline = (value: string | number) =>
  typeof value === 'string'
    ? format(fromDay(stringToDay(value)), 'dd MMM yyyy')
    : `${value} y.o.`
