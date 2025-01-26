import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useBreakDuration } from '../duration/state/useBreakDuration'
import { useEffect } from 'react'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useAutoBreakStartedAt } from './state/autoBreakStartedAt'
import { useWorkDayEndsAt } from '@increaser/ui/schedule/hooks/useWorkDayEndsAt'
import {
  getBlocks,
  getBlockWorkDuration,
} from '@increaser/entities-utils/block'
import { blockTargetDuration } from '@increaser/entities/Block'
import { focusDurations } from '@increaser/entities/FocusDuration'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { MS_IN_MIN } from '@lib/utils/time'
import { useIsTodayLateWorkUnlocked } from '../../focus/state/useIsTodayLateWorkUnlocked'
import { useHasAutoBreak } from './state/hasAutoBreak'
import { useDefaultBreakDuration } from '../duration/state/useDefaultBreakDuration'

export const AutoBreakManager = () => {
  const [breakDuration, setBreakDuration] = useBreakDuration()
  const [hasAutoBreak] = useHasAutoBreak()
  const [defaultBreakDuration] = useDefaultBreakDuration()

  const todaySets = useTodaySets()

  const [autoBreakStartedAt, setAutoBreakStartedAt] = useAutoBreakStartedAt()

  const workdayEndsAt = useWorkDayEndsAt()

  const isTodayLateWorkUnlocked = useIsTodayLateWorkUnlocked()

  useEffect(() => {
    if (!hasAutoBreak) {
      return
    }

    if (breakDuration) {
      return
    }

    if (isEmpty(todaySets)) {
      return
    }

    const { end } = getLastItem(todaySets)

    if (autoBreakStartedAt && autoBreakStartedAt > end) {
      return
    }

    const now = Date.now()

    if (!isTodayLateWorkUnlocked) {
      const workdayEndsIn = workdayEndsAt - now

      if (
        workdayEndsIn <
        convertDuration(defaultBreakDuration + focusDurations[0], 'min', 'ms')
      ) {
        return
      }
    }

    const duration = now - end

    if (duration > convertDuration(defaultBreakDuration, 'min', 'ms')) {
      return
    }

    const blocks = getBlocks(todaySets)
    const block = shouldBePresent(getLastItem(blocks))
    const blockWorkDuration = getBlockWorkDuration(block) / MS_IN_MIN

    if (blockWorkDuration + focusDurations[0] > blockTargetDuration) {
      return
    }

    setBreakDuration(defaultBreakDuration)
    setAutoBreakStartedAt(now)
  }, [
    autoBreakStartedAt,
    breakDuration,
    defaultBreakDuration,
    hasAutoBreak,
    isTodayLateWorkUnlocked,
    setAutoBreakStartedAt,
    setBreakDuration,
    todaySets,
    workdayEndsAt,
  ])

  return null
}
