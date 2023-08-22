import { getCurrentTimezoneOffset } from './getCurrentTimezoneOffset'
import { MS_IN_MIN } from './time'

export const inTimeZone = (timestamp: number, targetTimeZoneOffset: number) => {
  const offsetDiff = targetTimeZoneOffset - getCurrentTimezoneOffset()
  return timestamp + offsetDiff * MS_IN_MIN
}
