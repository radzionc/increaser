import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useMemo } from 'react'
import { getDaySets } from '@increaser/entities-utils/set/getDaySets'
import { useSets } from '@increaser/ui/sets/hooks/useSets'

export const useTodaySets = () => {
  const sets = useSets()
  const todayStartedAt = useStartOfDay()

  return useMemo(() => {
    return getDaySets(sets, todayStartedAt)
  }, [sets, todayStartedAt])
}
