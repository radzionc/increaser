import { useMemo } from 'react'
import { useSelectedInterval } from './useSelectedInterval'
import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'

export const useSelectedIntervalLength = () => {
  const [interval] = useSelectedInterval()

  return useMemo(() => getIntIntervalLength(interval), [interval])
}
