import { sum } from '@lib/utils/array/sum'
import { useOrderedTimeSeries } from './useOrderedTimeSeries'

export const useCurrentFrameTotalTracked = () => {
  const timeseries = useOrderedTimeSeries()

  return sum(timeseries.flatMap(({ data }) => data))
}
