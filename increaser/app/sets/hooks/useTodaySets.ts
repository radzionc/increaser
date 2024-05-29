import { getDaySets } from '@increaser/app/sets/helpers/getDaySets'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useMemo } from 'react'

export const useTodaySets = () => {
  const { sets } = useAssertUserState()
  const todayStartedAt = useStartOfDay()

  return useMemo(() => {
    return getDaySets(sets, todayStartedAt)
  }, [sets, todayStartedAt])
}
