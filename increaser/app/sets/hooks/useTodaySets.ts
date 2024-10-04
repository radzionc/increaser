import { useUser } from '@increaser/ui/user/state/user'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useMemo } from 'react'
import { getDaySets } from '@increaser/entities-utils/set/getDaySets'

export const useTodaySets = () => {
  const { sets } = useUser()
  const todayStartedAt = useStartOfDay()

  return useMemo(() => {
    return getDaySets(sets, todayStartedAt)
  }, [sets, todayStartedAt])
}
