import { useMemo } from 'react'
import { useUser } from '../../user/state/user'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useFocusIntervals } from '@increaser/app/focus/state/focusIntervals'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { Set } from '@increaser/entities/User'

export const useSets = () => {
  const { sets } = useUser()

  const [activeFocusIntervals] = useFocusIntervals()

  const now = useRhythmicRerender(convertDuration(2, 's', 'ms'))

  return useMemo(() => {
    if (!activeFocusIntervals || isEmpty(activeFocusIntervals)) {
      return sets
    }

    return [
      ...sets,
      ...activeFocusIntervals.map(
        ({ start, end, projectId }): Set => ({
          start,
          end: end || now,
          projectId,
          isActive: true,
        }),
      ),
    ]
  }, [activeFocusIntervals, now, sets])
}
