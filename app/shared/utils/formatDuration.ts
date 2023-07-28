import { MIN_IN_HOUR, MS_IN_MIN, S_IN_MIN } from 'utils/time'

type DurationUnit = 'ms' | 'min' | 's' | 'h'

const unitsInMinute: Record<DurationUnit, number> = {
  ms: MS_IN_MIN,
  min: 1,
  h: 1 / MIN_IN_HOUR,
  s: S_IN_MIN,
}

export const formatDuration = (duration: number, unit: DurationUnit) => {
  const minutes = Math.round(duration / unitsInMinute[unit])

  if (minutes < S_IN_MIN) return `${minutes}m`

  const hours = Math.floor(minutes / S_IN_MIN)
  const minutesPart = Math.round(minutes % S_IN_MIN)
  if (!minutesPart) {
    return `${hours}h`
  }
  return `${hours}h ${minutesPart}m`
}
