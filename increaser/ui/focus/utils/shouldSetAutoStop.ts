import { convertDuration } from '@lib/utils/time/convertDuration'

type Input = {
  now: number
  setDayEndsAt: number
  startedAt: number
  stoppedBeingVisibleAt: number | null
  startedBeingVisibleAt: number
}

export const shouldSetAutoStop = ({
  now,
  setDayEndsAt,
  startedAt,
  stoppedBeingVisibleAt,
  startedBeingVisibleAt,
}: Input) => {
  if (now > setDayEndsAt) {
    return true
  }

  const duration = now - startedAt
  if (duration > convertDuration(4, 'h', 'ms')) {
    return true
  }

  if (stoppedBeingVisibleAt && startedBeingVisibleAt) {
    const staleDuration = startedBeingVisibleAt - stoppedBeingVisibleAt
    if (
      staleDuration > convertDuration(1, 'h', 'ms') &&
      duration > convertDuration(2, 'h', 'ms')
    ) {
      return true
    }
  }

  return false
}
