import { getLastItem } from '@lib/utils/array/getLastItem'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { MS_IN_MIN } from '@lib/utils/time'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useTodaySets } from '@product/app/sets/hooks/useTodaySets'
import { blockTargetDuration } from '@product/entities/Block'
import { focusDurations } from '@product/entities/FocusDuration'
import { getBlocks, getBlockWorkDuration } from '@product/entities-utils/block'
import { useWorkDayEndsAt } from '@product/ui/schedule/hooks/useWorkDayEndsAt'
import { useEffect } from 'react'

import { useIsTodayLateWorkUnlocked } from '../../focus/state/useIsTodayLateWorkUnlocked'
import { useBreakDuration } from '../duration/state/useBreakDuration'
import { useDefaultBreakDuration } from '../duration/state/useDefaultBreakDuration'

import { useAutoBreakStartedAt } from './state/autoBreakStartedAt'
import { useHasAutoBreak } from './state/hasAutoBreak'

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
