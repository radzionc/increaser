import styled, { useTheme } from 'styled-components'
import { Circle } from '@lib/ui/layout/Circle'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { useMemo } from 'react'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { centerContent } from '@lib/ui/css/centerContent'
import { useHasReachedFinalWorkday } from '../../projects/budget/hooks/useHasReachedFinalWorkday'
import { useCurrentDayTarget } from '../../projects/budget/hooks/useCurrentDayTarget'

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
  const { colors } = useTheme()

  const hasReachedFinalDay = useHasReachedFinalWorkday()
  const target = useCurrentDayTarget()

  const color = useMemo(() => {
    if (!allocatedMinutesPerWeek) {
      return colors.mist
    }

    if (!goal) {
      return colors.textShy
    }

    if (doneMinutesThisWeek > allocatedMinutesPerWeek) {
      return goal === 'doMore' ? colors.success : colors.alert
    }

    if (doneMinutesThisWeek < target) {
      return goal === 'doMore' ? colors.idle : colors.success
    }

    return goal === 'doMore' ? colors.success : colors.idle
  }, [
    allocatedMinutesPerWeek,
    colors.alert,
    colors.idle,
    colors.mist,
    colors.success,
    colors.textShy,
    doneMinutesThisWeek,
    goal,
    target,
  ])

  const outlineColor = useMemo(() => {
    if (!allocatedMinutesPerWeek || !goal) {
      return colors.transparent
    }

    if (goal === 'doMore' && doneMinutesThisWeek >= allocatedMinutesPerWeek) {
      return colors.success
    }

    if (hasReachedFinalDay && goal === 'doLess') {
      return doneMinutesThisWeek <= allocatedMinutesPerWeek
        ? colors.success
        : colors.alert
    }

    return colors.transparent
  }, [
    allocatedMinutesPerWeek,
    colors.alert,
    colors.success,
    colors.transparent,
    doneMinutesThisWeek,
    goal,
    hasReachedFinalDay,
  ])

  return (
    <Outline style={{ color: outlineColor.toCssValue() }}>
      <Circle size={8} background={color} />
    </Outline>
  )
}
