import { EntityWithStartDate } from '@lib/utils/entities/EntityWithStartDate'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay } from 'date-fns'

export const getHabitTrackingDays = ({ startedAt }: EntityWithStartDate) => {
  return Math.round(
    convertDuration(
      startOfDay(Date.now()).getTime() - startOfDay(startedAt).getTime(),
      'ms',
      'd',
    ) + 1,
  )
}
