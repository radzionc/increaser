import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { sum } from '@lib/utils/array/sum'
import { useTheme } from 'styled-components'
import { Circle } from '@lib/ui/layout/Circle'
import { AlertTriangleIcon } from '@lib/ui/icons/AlertTriangeIcon'
import { CheckDoubleIcon } from '@lib/ui/icons/CheckDoubleIcon'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { Text } from '@lib/ui/text'
import { useWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/hooks/useWeekTimeAllocation'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

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
