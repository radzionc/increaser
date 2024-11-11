import styled from 'styled-components'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { toPercents } from '@lib/utils/toPercents'
import { useCurrentDayTarget } from '../hooks/useCurrentDayTarget'

import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'
import { useProjectBudgetOffsetColor } from '../hooks/useProjectBudgetOffsetColor'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Offset = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  border: 2px solid;
  ${borderRadius.xs};
`

export const ProjectBudgetOffset = () => {
  const { allocatedMinutesPerWeek, id } = useCurrentProject()

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(id)

  const target = useCurrentDayTarget()

  const isUnderTarget = doneMinutesThisWeek < target

  const color = useProjectBudgetOffsetColor(id)

  const value = isUnderTarget
    ? (target - doneMinutesThisWeek) / allocatedMinutesPerWeek
    : (doneMinutesThisWeek - target) / allocatedMinutesPerWeek

  if (!value) return null

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
