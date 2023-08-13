import { DateTime } from 'luxon'

export const getStartOfWeekTimestamp = (timeZone: number) =>
  DateTime.now().toUTC(-timeZone).startOf('week').toMillis()
