import { toDay } from '@lib/utils/time/Day'
import { subYears } from 'date-fns'
import { useMemo } from 'react'

export const useDobBoundaries = () => {
  const maxDob = useMemo(() => toDay(subYears(Date.now(), 6).getTime()), [])
  const minDob = useMemo(() => toDay(subYears(Date.now(), 100).getTime()), [])

  return [minDob, maxDob]
}
