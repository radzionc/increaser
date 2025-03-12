import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { getDaySets } from '@product/entities-utils/set/getDaySets'
import { useSets } from '@product/ui/sets/hooks/useSets'
import { useMemo } from 'react'

export const useTodaySets = () => {
  const sets = useSets()
  const todayStartedAt = useStartOfDay()

  return useMemo(() => {
    return getDaySets(sets, todayStartedAt)
  }, [sets, todayStartedAt])
}
