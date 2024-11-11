import { useMemo } from 'react'
import { useSelectedIntervalActiveTimeSeries } from '../chart/useSelectedIntervalActiveTimeSeries'
import { useGetStartOfIntervalPoint } from '../timeGrouping/useGetStartOfIntervalPoint'
import { AverageValue } from './AverageValue'
import { useUser } from '../../../user/state/user'
import { getWeekday } from '@lib/utils/time/getWeekday'

export const WeekendAverage = () => {
  const timeSeries = useSelectedIntervalActiveTimeSeries()

  const getStart = useGetStartOfIntervalPoint()

  const { weekends } = useUser()

  const value = useMemo(
    () =>
      timeSeries.filter((_, index) =>
        weekends.includes(getWeekday(getStart(index))),
      ),
    [getStart, timeSeries, weekends],
  )

  return <AverageValue kind="secondary" name="Weekend" value={value} />
}
