import { useStartOfMonth } from '@increaser/ui/hooks/useStartOfMonth'
import { useMemo } from 'react'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useCurrentMonthSets = () => {
  const { sets, prevSets } = useAssertUserState()

  const startOfMonth = useStartOfMonth()

  return useMemo(
    () => [...sets, ...prevSets].filter((set) => set.start > startOfMonth),
    [prevSets, sets, startOfMonth],
  )
}
