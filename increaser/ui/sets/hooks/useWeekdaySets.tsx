import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useMemo } from 'react'
import { getDaySets } from '@increaser/entities-utils/set/getDaySets'
import { useSets } from './useSets'

export const useWeekdaySets = (weekday: number) => {
  const startedAt = useStartOfWeekday(weekday)
  const sets = useSets()

  return useMemo(() => {
    return getDaySets(sets, startedAt)
  }, [sets, startedAt])
}
