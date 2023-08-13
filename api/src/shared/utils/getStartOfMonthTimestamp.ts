import { DateTime } from 'luxon'

export const getStartOfMonthTimestamp = (timeZone: number) =>
  DateTime.now().toUTC(-timeZone).startOf('month').toMillis()
