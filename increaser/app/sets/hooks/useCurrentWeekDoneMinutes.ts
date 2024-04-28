import { useMemo } from 'react'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { MS_IN_MIN } from '@lib/utils/time'
import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'

export const useCurrentWeekDoneMinutes = () => {
  const sets = useCurrentWeekSets()
  return useMemo(() => Math.round(getSetsDuration(sets) / MS_IN_MIN), [sets])
}
