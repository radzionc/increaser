import styled, { useTheme } from 'styled-components'
import { Circle } from '@lib/ui/layout/Circle'
import { useMemo } from 'react'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { centerContent } from '@lib/ui/css/centerContent'
import { useHasReachedFinalWorkday } from '@increaser/ui/projects/budget/hooks/useHasReachedFinalWorkday'
import { useCurrentDayTarget } from '@increaser/ui/projects/budget/hooks/useCurrentDayTarget'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { useProject } from '@increaser/ui/projects/hooks/useProject'
import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'
import { getProjectDoneMinutes } from '@increaser/ui/projects/utils/getProjectDoneMinutes'

const Outline = styled.div`
  ${round};
  border: 1px solid;
  color: transparent;
  ${sameDimensions(12)};
  ${centerContent};
`

export const ProjectGoalBadge = () => {
  const projectId = useCurrentProject()
  const project = useProject(projectId)
  const { colors } = useTheme()
  const sets = useCurrentWeekSets()

  const hasReachedFinalDay = useHasReachedFinalWorkday()
  const target = useCurrentDayTarget()

  const color = useMemo(() => {
    if (!project) {
      return colors.mist
    }

    const { allocatedMinutesPerWeek, goal } = project

    if (!allocatedMinutesPerWeek) {
      return colors.mist
    }

    if (!goal) {
      return colors.textShy
    }

    const doneMinutesThisWeek = getProjectDoneMinutes({ sets, id: projectId })

    if (doneMinutesThisWeek > allocatedMinutesPerWeek) {
      return goal === 'doMore' ? colors.success : colors.alert
    }

    if (doneMinutesThisWeek < target) {
      return goal === 'doMore' ? colors.idle : colors.success
    }

    return goal === 'doMore' ? colors.success : colors.idle
  }, [
    colors.alert,
    colors.idle,
    colors.mist,
    colors.success,
    colors.textShy,
    project,
    projectId,
    sets,
    target,
  ])

  const outlineColor = useMemo(() => {
    if (!project) {
      return colors.transparent
    }

    const { allocatedMinutesPerWeek, goal } = project

    if (!allocatedMinutesPerWeek || !goal) {
      return colors.transparent
    }

    const doneMinutesThisWeek = getProjectDoneMinutes({ sets, id: projectId })

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
    colors.alert,
    colors.success,
    colors.transparent,
    hasReachedFinalDay,
    project,
    projectId,
    sets,
  ])

  return (
    <Outline style={{ color: outlineColor.toCssValue() }}>
      <Circle size={8} background={color} />
    </Outline>
  )
}
