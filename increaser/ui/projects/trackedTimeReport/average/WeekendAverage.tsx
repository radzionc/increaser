import { useMemo } from 'react'
import { useSelectedIntervalActiveTimeSeries } from '../chart/useSelectedIntervalActiveTimeSeries'
import { useGetStartOfIntervalPoint } from '../timeGrouping/useGetStartOfIntervalPoint'
import { AverageValue } from './AverageValue'
import { isWorkday } from '@lib/utils/time/workweek'

export const WeekendAverage = () => {
  const timeSeries = useSelectedIntervalActiveTimeSeries()

  const getStart = useGetStartOfIntervalPoint()

  const value = useMemo(
    () => timeSeries.filter((_, index) => !isWorkday(getStart(index))),
    [getStart, timeSeries],
  )

  return <AverageValue kind="secondary" name="Weekend" value={value} />
}
