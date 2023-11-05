import { EnhancedProject } from 'projects/Project'
import { useWeekday } from '@increaser/ui/hooks/useWeekday'
import { sum } from '@increaser/utils/array/sum'
import { useTheme } from 'styled-components'
import { Circle } from '@increaser/ui/ui/Circle'
import { AlertTriangleIcon } from '@increaser/ui/icons/AlertTriangeIcon'
import { CheckDoubleIcon } from '@increaser/ui/icons/CheckDoubleIcon'
import { CheckIcon } from '@increaser/ui/icons/CheckIcon'
import { Text } from '@increaser/ui/ui/Text'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'

interface ProjectGoalBadgeProps {
  project: EnhancedProject
}

export const ProjectGoalBadge = ({ project }: ProjectGoalBadgeProps) => {
  const { allocatedMinutesPerWeek, doneMinutesThisWeek } = project
  const { allocation, totalMinutes } = useWeekTimeAllocation()
  const weekday = useWeekday()

  const { colors } = useTheme()

  if (!allocatedMinutesPerWeek) {
    return <Circle size={8} background={colors.textShy} />
  }

  const target =
    allocatedMinutesPerWeek *
    (sum(allocation.filter((_, index) => index <= weekday)) / totalMinutes)

  if (doneMinutesThisWeek >= allocatedMinutesPerWeek) {
    return (
      <Text as="span" color="success">
        <CheckDoubleIcon />
      </Text>
    )
  }

  if (doneMinutesThisWeek >= target) {
    return (
      <Text as="span" color="success">
        <CheckIcon />
      </Text>
    )
  }

  return (
    <Text as="span" color="alert">
      <AlertTriangleIcon />
    </Text>
  )
}
