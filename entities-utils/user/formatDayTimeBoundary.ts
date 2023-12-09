import { getDateFromMinutes } from '@increaser/utils/time/getDateFromMinutes'

export const formatDayTimeBoudnary = (value: number) =>
  getDateFromMinutes(value).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
