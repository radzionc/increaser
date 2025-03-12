import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { getDaySets } from '@product/entities-utils/set/getDaySets'
import { useMemo } from 'react'

import { useSets } from './useSets'

export const useWeekdaySets = (weekday: number) => {
  const startedAt = useStartOfWeekday(weekday)
  const sets = useSets()

  return useMemo(() => {
    return getDaySets(sets, startedAt)
  }, [sets, startedAt])
}
