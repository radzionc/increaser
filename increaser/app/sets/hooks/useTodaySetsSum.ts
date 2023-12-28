import { useMemo } from 'react'
import { getSetsSum } from '@increaser/app/sets/helpers/getSetsSum'

import { useTodaySets } from './useTodaySets'

export const useTodaySetsSum = (): number => {
  const todaySets = useTodaySets()

  return useMemo(() => getSetsSum(todaySets), [todaySets])
}
