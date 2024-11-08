import { useMemo } from 'react'

import { useGetStartOfIntervalPoint } from './useGetStartOfIntervalPoint'

export const useStartOfSelectedIntervalPoint = (index: number) => {
  const getStart = useGetStartOfIntervalPoint()

  return useMemo(() => getStart(index), [getStart, index])
}
