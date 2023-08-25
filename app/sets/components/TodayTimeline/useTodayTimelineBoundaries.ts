import { getHours } from 'date-fns'
import { useFocus } from 'focus/hooks/useFocus'
import { useMemo } from 'react'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MIN_IN_HOUR, MS_IN_MIN } from '@increaser/utils/time'

export const useTodayTimelineBoundaries = () => {
  const todaySets = useTodaySets()
  const { currentSet } = useFocus()

  const { goalToStartWorkAt, goalToFinishWorkBy } = useAssertUserState()

  const now = useRhythmicRerender(5000)
  const todayStartedAt = useStartOfDay()

  const startHour = useMemo(() => {
    const goalToStartWorkAtHour = Math.floor(goalToStartWorkAt / MIN_IN_HOUR)

    const firstSetStartedAt = todaySets.length
      ? todaySets[0]?.start
      : currentSet?.startedAt

    if (!firstSetStartedAt) {
      return Math.min(goalToStartWorkAtHour, getHours(Date.now()))
    }

    return Math.min(
      getHours(new Date(firstSetStartedAt)),
      goalToStartWorkAtHour,
    )
  }, [currentSet?.startedAt, todaySets, goalToStartWorkAt])

  const minutesSinceTodayStarted = (now - todayStartedAt) / MS_IN_MIN

  const end =
    minutesSinceTodayStarted > goalToFinishWorkBy
      ? Math.ceil(minutesSinceTodayStarted / MIN_IN_HOUR) * MIN_IN_HOUR
      : goalToFinishWorkBy

  const start = startHour * MIN_IN_HOUR

  return { start, end }
}
