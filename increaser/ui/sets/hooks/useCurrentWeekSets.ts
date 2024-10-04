import { useMemo } from 'react'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useUser } from '@increaser/ui/user/state/user'

export const useCurrentWeekSets = () => {
  const { sets } = useUser()

  const startOfWeek = useStartOfWeek()

  return useMemo(
    () => sets.filter((set) => set.start >= startOfWeek),
    [sets, startOfWeek],
  )
}
