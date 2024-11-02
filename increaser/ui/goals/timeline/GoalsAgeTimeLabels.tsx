import { useGoalsTimeline } from './state/GoalsTimelineContext'
import { useMemo } from 'react'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { toPercents } from '@lib/utils/toPercents'
import { useUser } from '../../user/state/user'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { TimelineLabel } from './TimelineLabel'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'

export const GoalsAgeTimeLabels = () => {
  const { interval, timeLabels } = useGoalsTimeline()
  const { dob } = useUser()

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
          title={
            <EmphasizeNumbers
              value={`${getUserAgeAt({
                dob: shouldBePresent(dob),
                at: timestamp,
              })} y.o.`}
            />
          }
        />
      ))}
    </>
  )
}
