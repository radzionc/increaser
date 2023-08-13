import { DateTime } from 'luxon'

export const getStartOfDayTimestamp = (timeZone: number) =>
  DateTime.now().toUTC(-timeZone).startOf('day').toMillis()
