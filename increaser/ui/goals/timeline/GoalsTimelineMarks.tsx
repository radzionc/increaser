import { useGoalsTimeline } from './state/GoalsTimelineContext'
import styled from 'styled-components'
import { goalsTimelineConfig } from './config'
import { getColor } from '@lib/ui/theme/getters'
import { HStack } from '@lib/ui/css/stack'
import { MONTHS_IN_YEAR } from '@lib/utils/time'
import { range } from '@lib/utils/array/range'

const Mark = styled.div`
  width: 1px;
  background: ${getColor('foregroundExtra')};
`

export const GoalsTimelineMarks = () => {
  const { timeLabels } = useGoalsTimeline()

  const labelsCount = (timeLabels.length - 1) * MONTHS_IN_YEAR + 1

  return (
    <HStack fullWidth alignItems="center" justifyContent="space-between">
      {range(labelsCount).map((index) => (
        <Mark
          key={index}
          style={{
            height:
              goalsTimelineConfig.marksHeight *
              (index % MONTHS_IN_YEAR === 0 ? 1 : 0.4),
          }}
        />
      ))}
    </HStack>
  )
}
