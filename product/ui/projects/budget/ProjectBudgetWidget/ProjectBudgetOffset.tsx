import { borderRadius } from '@lib/ui/css/borderRadius'
import { toPercents } from '@lib/utils/toPercents'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import { useMemo } from 'react'
import styled from 'styled-components'

import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'
import { useCurrentDayTarget } from '../hooks/useCurrentDayTarget'
import { useProjectBudgetOffsetColor } from '../hooks/useProjectBudgetOffsetColor'

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

  const total = Math.max(doneMinutesThisWeek, allocatedMinutesPerWeek)

  const left = useMemo(() => {
    if (isUnderTarget) {
      return doneMinutesThisWeek / total
    }

    return target / total
  }, [doneMinutesThisWeek, isUnderTarget, target, total])

  const width = useMemo(() => {
    if (isUnderTarget) {
      return (target - doneMinutesThisWeek) / total
    }

    return (doneMinutesThisWeek - target) / total
  }, [doneMinutesThisWeek, isUnderTarget, target, total])

  return (
    <Offset
      style={{
        left: toPercents(left),
        width: toPercents(width),
        color: color.toCssValue(),
      }}
    />
  )
}
