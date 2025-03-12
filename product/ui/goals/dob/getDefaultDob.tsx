import { toDay } from '@lib/utils/time/Day'
import { subYears } from 'date-fns'

export const getDefaultDob = () => toDay(subYears(Date.now(), 20).getTime())
