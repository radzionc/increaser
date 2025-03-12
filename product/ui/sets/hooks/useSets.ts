import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useFocusIntervals } from '@product/ui/focus/state/focusIntervals'
import { useMemo } from 'react'

import { focusIntervalsToSets } from '../../focus/utils/focusIntervalsToSets'
import { useUser } from '../../user/state/user'

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
