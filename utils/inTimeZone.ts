import { MS_IN_MIN } from './time'

export const inTimeZone = (timestamp: number, targetTimeZoneOffset: number) => {
  const currentOffset = new Date().getTimezoneOffset()
  const offsetDiff = targetTimeZoneOffset - currentOffset
  return timestamp + offsetDiff * MS_IN_MIN
}
