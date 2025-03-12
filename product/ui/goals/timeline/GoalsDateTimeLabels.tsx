import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { toPercents } from '@lib/utils/toPercents'
import { format } from 'date-fns'
import { useMemo } from 'react'

import { useGoalsTimeline } from './state/GoalsTimelineContext'
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
