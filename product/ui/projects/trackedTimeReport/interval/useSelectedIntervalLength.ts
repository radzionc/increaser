import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { useMemo } from 'react'

import { useSelectedInterval } from './useSelectedInterval'

export const useSelectedIntervalLength = () => {
  const [interval] = useSelectedInterval()

  return useMemo(() => getIntIntervalLength(interval), [interval])
}
