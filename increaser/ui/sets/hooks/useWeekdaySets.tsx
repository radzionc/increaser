import { getDaySets } from '@increaser/app/sets/helpers/getDaySets'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'

export const useWeekdaySets = (weekday: number) => {
  const startedAt = useStartOfWeekday(weekday)
  const { sets } = useAssertUserState()

  return useMemo(() => {
    return getDaySets(sets, startedAt)
  }, [sets, startedAt])
}
