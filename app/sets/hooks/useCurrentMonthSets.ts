import { useStartOfMonth } from '@increaser/ui/hooks/useStartOfMonth'
import { useMemo } from 'react'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useCurrentMonthSets = () => {
  const { sets } = useAssertUserState()

  const startOfMonth = useStartOfMonth()

  return useMemo(
    () => sets.filter((set) => set.start > startOfMonth),
    [sets, startOfMonth],
  )
}
