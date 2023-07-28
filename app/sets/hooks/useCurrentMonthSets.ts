import { useMemo } from 'react'
import { useStartOfMonth } from 'shared/hooks/useStartOfMonth'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useCurrentMonthSets = () => {
  const { sets, prevSets } = useAssertUserState()

  const startOfMonth = useStartOfMonth()

  return useMemo(
    () => [...sets, ...prevSets].filter((set) => set.start > startOfMonth),
    [prevSets, sets, startOfMonth],
  )
}
