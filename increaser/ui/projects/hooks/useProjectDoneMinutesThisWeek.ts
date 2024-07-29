import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useMemo } from 'react'
import { useCurrentWeekSets } from '../../sets/hooks/useCurrentWeekSets'

export const useProjectDoneMinutesThisWeek = (id: string) => {
  const currentWeekSets = useCurrentWeekSets()

  return useMemo(
    () =>
      Math.round(
        convertDuration(
          getSetsDuration(
            currentWeekSets.filter((set) => set.projectId === id),
          ),
          'ms',
          'min',
        ),
      ),
    [currentWeekSets, id],
  )
}
