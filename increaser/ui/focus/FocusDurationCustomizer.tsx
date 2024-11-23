import { useEffect, useMemo } from 'react'
import { useWorkDayEndsAt } from '../schedule/hooks/useWorkDayEndsAt'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import {
  getBlocks,
  getBlockWorkDuration,
} from '@increaser/entities-utils/block'
import { useFocusDuration } from '@increaser/ui/focus/state/focusDuration'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  FocusDuration,
  focusDurations,
  pomodoroFocusDuration,
  targetFocusDuration,
} from '@increaser/entities/FocusDuration'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { blockMaxBreak, blockTargetDuration } from '@increaser/entities/Block'
import { order } from '@lib/utils/array/order'

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
