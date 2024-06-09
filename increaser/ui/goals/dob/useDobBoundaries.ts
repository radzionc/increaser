import { toDay } from '@lib/utils/time/Day'
import { useMemo } from 'react'
import { subYears } from 'date-fns'

export const useDobBoundaries = () => {
  const maxDob = useMemo(() => toDay(subYears(Date.now(), 6).getTime()), [])
  const minDob = useMemo(() => toDay(subYears(Date.now(), 100).getTime()), [])

  return [minDob, maxDob]
}
