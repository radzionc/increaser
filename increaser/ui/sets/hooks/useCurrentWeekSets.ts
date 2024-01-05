import { useMemo } from 'react'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const useCurrentWeekSets = () => {
  const { sets } = useAssertUserState()

  const startOfWeek = useStartOfWeek()

  return useMemo(
    () => sets.filter((set) => set.start > startOfWeek),
    [sets, startOfWeek],
  )
}
