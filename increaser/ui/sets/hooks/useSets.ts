import { useMemo } from 'react'
import { useUser } from '../../user/state/user'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useFocusIntervals } from '@increaser/ui/focus/state/focusIntervals'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { focusIntervalsToSets } from '../../focus/utils/focusIntervalsToSets'

export const useSets = () => {
  const { sets } = useUser()

  const [activeFocusIntervals] = useFocusIntervals()

  const now = useRhythmicRerender(convertDuration(2, 's', 'ms'))

  return useMemo(() => {
    if (!activeFocusIntervals || isEmpty(activeFocusIntervals)) {
      return sets
    }

    const activeSets = focusIntervalsToSets({
      intervals: activeFocusIntervals,
      now,
    }).map((set) => ({ ...set, isActive: true }))

    return [...sets, ...activeSets]
  }, [activeFocusIntervals, now, sets])
}
