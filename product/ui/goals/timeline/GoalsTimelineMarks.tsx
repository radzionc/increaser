import { HStack } from '@lib/ui/css/stack'
import { IsActiveProp } from '@lib/ui/props'
import { matchColor } from '@lib/ui/theme/getters'
import { range } from '@lib/utils/array/range'
import { MONTHS_IN_YEAR } from '@lib/utils/time'
import { addMonths } from 'date-fns'
import styled from 'styled-components'

import { goalsTimelineConfig } from './config'
import { useGoalsTimeline } from './state/GoalsTimelineContext'

const Mark = styled.div<IsActiveProp>`
  width: 1px;
  background: ${matchColor('isActive', {
    true: 'textPrimary',
    false: 'foregroundExtra',
  })};
`

export const GoalsTimelineMarks = () => {
  const { timeLabels, interval } = useGoalsTimeline()

  const labelsCount = (timeLabels.length - 1) * MONTHS_IN_YEAR + 1

  const now = Date.now()

  return (
    <HStack fullWidth alignItems="center" justifyContent="space-between">
      {range(labelsCount).map((index) => {
        const height =
          goalsTimelineConfig.marksHeight *
          (index % MONTHS_IN_YEAR === 0 ? 1 : 0.4)

        const time = addMonths(interval.start, index).getTime()
        const isActive = time <= now

        return (
          <Mark
            key={index}
            isActive={isActive}
            style={{
              height,
            }}
          />
        )
      })}
    </HStack>
  )
}
