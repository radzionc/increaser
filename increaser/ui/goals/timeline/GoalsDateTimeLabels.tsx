import { useGoalsTimeline } from './state/GoalsTimelineContext'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { toPercents } from '@lib/utils/toPercents'
import { TimelineLabel } from './TimelineLabel'

export const GoalsDateTimeLabels = () => {
  const { interval, timeLabels } = useGoalsTimeline()

  const intervalDuration = useMemo(
    () => getIntervalDuration(interval),
    [interval],
  )

  return (
    <>
      {timeLabels.map((timestamp) => (
        <TimelineLabel
          left={toPercents((timestamp - interval.start) / intervalDuration)}
          key={timestamp}
          title={format(new Date(timestamp), 'yyyy')}
        />
      ))}
    </>
  )
}
