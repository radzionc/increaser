import { useMemo } from 'react'

import { useTodaySets } from './useTodaySets'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'

export const useTodaySetsSum = (): number => {
  const todaySets = useTodaySets()

  return useMemo(() => getSetsDuration(todaySets), [todaySets])
}
