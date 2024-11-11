import { useMemo } from 'react'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useSets } from './useSets'

export const useCurrentWeekSets = () => {
  const sets = useSets()

  const startOfWeek = useStartOfWeek()

  return useMemo(
    () => sets.filter((set) => set.start >= startOfWeek),
    [sets, startOfWeek],
  )
}
