import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { toPercents } from '@lib/utils/toPercents'
import { getUserAgeAt } from '@product/entities-utils/user/getUserAgeAt'
import { useMemo } from 'react'

import { useUser } from '../../user/state/user'

import { useGoalsTimeline } from './state/GoalsTimelineContext'
import { TimelineLabel } from './TimelineLabel'

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
