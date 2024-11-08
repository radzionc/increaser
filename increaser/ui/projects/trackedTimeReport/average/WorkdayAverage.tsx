import { useMemo } from 'react'
import { useSelectedIntervalActiveTimeSeries } from '../chart/useSelectedIntervalActiveTimeSeries'
import { useGetStartOfIntervalPoint } from '../timeGrouping/useGetStartOfIntervalPoint'
import { AverageValue } from './AverageValue'
import { isWorkday } from '@lib/utils/time/workweek'
import { sum } from '@lib/utils/array/sum'

export const WorkdayAverage = () => {
  const timeSeries = useSelectedIntervalActiveTimeSeries()

  const getStart = useGetStartOfIntervalPoint()

  const value = useMemo(() => {
    const workdays = timeSeries.filter((_, index) => isWorkday(getStart(index)))

    return sum(workdays) / workdays.length
  }, [getStart, timeSeries])

  return <AverageValue name="workday" value={value} />
}
