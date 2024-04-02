import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { sum } from '@lib/utils/array/sum'
import styled, { useTheme } from 'styled-components'
import { Circle } from '@lib/ui/layout/Circle'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { useProjectDaysAllocation } from '../../../projects/budget/hooks/useProjectDaysAllocation'
import { useMemo } from 'react'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { centerContent } from '@lib/ui/css/centerContent'

interface ProjectGoalBadgeProps {
  project: EnhancedProject
}

const Outline = styled.div`
  ${round};
  border: 1px solid;
  color: transparent;
  ${sameDimensions(12)};
  ${centerContent};
`

export const ProjectGoalBadge = ({ project }: ProjectGoalBadgeProps) => {
  const { allocatedMinutesPerWeek, doneMinutesThisWeek, goal } = project
  const weekday = useWeekday()

  const { colors } = useTheme()

  const allocation = useProjectDaysAllocation()

  const color = useMemo(() => {
    if (!allocatedMinutesPerWeek || !goal) {
      return colors.textShy
    }

    const target =
      allocatedMinutesPerWeek * sum(allocation.slice(0, weekday + 1))

    if (doneMinutesThisWeek > allocatedMinutesPerWeek) {
      return goal === 'doMore' ? colors.success : colors.alert
    }

    if (doneMinutesThisWeek < target) {
      return goal === 'doMore' ? colors.idle : colors.success
    }

    return goal === 'doMore' ? colors.success : colors.idle
  }, [
    allocatedMinutesPerWeek,
    allocation,
    colors.alert,
    colors.idle,
    colors.success,
    colors.textShy,
    doneMinutesThisWeek,
    goal,
    weekday,
  ])

  const outlineColor = useMemo(() => {
    if (goal === 'doMore' && doneMinutesThisWeek >= allocatedMinutesPerWeek) {
      return colors.success
    }

    return colors.transparent
  }, [
    allocatedMinutesPerWeek,
    colors.success,
    colors.transparent,
    doneMinutesThisWeek,
    goal,
  ])

  return (
    <Outline style={{ color: outlineColor.toCssValue() }}>
      <Circle size={8} background={color} />
    </Outline>
  )
}
