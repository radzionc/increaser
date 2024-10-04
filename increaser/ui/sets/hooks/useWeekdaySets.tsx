import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { getDaySets } from '@increaser/entities-utils/set/getDaySets'

export const useWeekdaySets = (weekday: number) => {
  const startedAt = useStartOfWeekday(weekday)
  const { sets } = useUser()

  return useMemo(() => {
    return getDaySets(sets, startedAt)
  }, [sets, startedAt])
}
