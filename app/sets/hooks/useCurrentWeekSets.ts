import { useMemo } from 'react'
import { useStartOfWeek } from 'shared/hooks/useStartOfWeek'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useCurrentWeekSets = () => {
  const { sets } = useAssertUserState()

  const startOfWeek = useStartOfWeek()

  return useMemo(
    () => sets.filter((set) => set.start > startOfWeek),
    [sets, startOfWeek],
  )
}
