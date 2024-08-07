import styled from 'styled-components'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { toPercents } from '@lib/utils/toPercents'
import { useCurrentDayTarget } from '../hooks/useCurrentDayTarget'

import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'
import { useProjectBudgetOffsetColor } from '../hooks/useProjectBudgetOffsetColor'

const Offset = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  border: 2px solid;
`

export const ProjectBudgetOffset = () => {
  const { allocatedMinutesPerWeek, id } = useCurrentProject()

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(id)

  const target = useCurrentDayTarget()

  const isUnderTarget = doneMinutesThisWeek < target

  const color = useProjectBudgetOffsetColor(id)

  return (
    <Offset
      style={{
        left: toPercents(
          isUnderTarget
            ? doneMinutesThisWeek / allocatedMinutesPerWeek
            : target / allocatedMinutesPerWeek,
        ),
        width: toPercents(
          isUnderTarget
            ? (target - doneMinutesThisWeek) / allocatedMinutesPerWeek
            : (doneMinutesThisWeek - target) / allocatedMinutesPerWeek,
        ),
        color: color.toCssValue(),
      }}
    />
  )
}
