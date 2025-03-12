import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { order } from '@lib/utils/array/order'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useTodaySets } from '@product/app/sets/hooks/useTodaySets'
import { blockMaxBreak, blockTargetDuration } from '@product/entities/Block'
import {
  FocusDuration,
  focusDurations,
  pomodoroFocusDuration,
  targetFocusDuration,
} from '@product/entities/FocusDuration'
import { getBlocks, getBlockWorkDuration } from '@product/entities-utils/block'
import { useFocusDuration } from '@product/ui/focus/state/focusDuration'
import { useEffect, useMemo } from 'react'

import { useWorkDayEndsAt } from '../schedule/hooks/useWorkDayEndsAt'

export const FocusDurationCustomizer = () => {
  const workdayEndsAt = useWorkDayEndsAt()

  const [focusDuration, setFocusDuration] = useFocusDuration()

  const todaySets = useTodaySets()

  const block = useMemo(() => getLastItem(getBlocks(todaySets)), [todaySets])

  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const blockBasedDuration = useMemo(() => {
    if (!block) {
      return targetFocusDuration
    }

    const isBlockEnded =
      getLastItem(block.sets).end <
      now - convertDuration(blockMaxBreak, 'min', 'ms')

    if (isBlockEnded) {
      return targetFocusDuration
    }

    const blockWorkDuration = convertDuration(
      getBlockWorkDuration(block),
      'ms',
      'min',
    )

    const remainingDuration = blockTargetDuration - blockWorkDuration

    return (
      order(focusDurations, (v) => v, 'asc').find(
        (duration) => duration >= remainingDuration,
      ) ?? pomodoroFocusDuration
    )
  }, [block, now])

  const recommendedDuration = useMemo(() => {
    const remainingDuration = convertDuration(workdayEndsAt - now, 'ms', 'min')

    const maxDuration = order(focusDurations, (v) => v, 'desc').find(
      (duration) => duration < remainingDuration,
    )

    if (!maxDuration) {
      return targetFocusDuration
    }

    return Math.min(maxDuration, blockBasedDuration) as FocusDuration
  }, [blockBasedDuration, now, workdayEndsAt])

  useEffect(() => {
    if (focusDuration !== recommendedDuration) {
      setFocusDuration(recommendedDuration)
    }
  }, [focusDuration, recommendedDuration, setFocusDuration])

  return null
}
