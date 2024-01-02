import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { Text } from '@lib/ui/text'
import { useWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/hooks/useWeekTimeAllocation'
import Link from 'next/link'
import { ProjectGoalBadge } from './ProjectGoalBadge'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'
import { useTheme } from 'styled-components'
import { useMemo } from 'react'
import { AppPath } from '@increaser/ui/navigation/AppPath'

interface ProjectWeeklyGoalProps {
  projectId: string
}

export const ProjectWeeklyGoal = ({ projectId }: ProjectWeeklyGoalProps) => {
  const { allocation, totalMinutes } = useWeekTimeAllocation()

  const { colors } = useTheme()

  const { projectsRecord } = useProjects()
  const project = projectsRecord[projectId]
  const { allocatedMinutesPerWeek, doneMinutesThisWeek, name } = project
  const weekday = useWeekday()

  const target =
    allocatedMinutesPerWeek *
    (sum(allocation.filter((_, index) => index <= weekday)) / totalMinutes)

  const segments = useMemo(() => {
    if (doneMinutesThisWeek >= allocatedMinutesPerWeek) {
      return [
        {
          color: colors.success,
          proportion: 1,
        },
      ]
    }

    if (doneMinutesThisWeek < target) {
      return [
        {
          color: colors.mistExtra,
          proportion: doneMinutesThisWeek / allocatedMinutesPerWeek,
        },
        {
          color: colors.alert,
          proportion: (target - doneMinutesThisWeek) / allocatedMinutesPerWeek,
        },
      ]
    }

    if (doneMinutesThisWeek > target) {
      return [
        {
          color: colors.mistExtra,
          proportion: target / allocatedMinutesPerWeek,
        },
        {
          color: colors.success,
          proportion: (doneMinutesThisWeek - target) / allocatedMinutesPerWeek,
        },
      ]
    }

    return [
      {
        color: colors.mistExtra,
        proportion: doneMinutesThisWeek / allocatedMinutesPerWeek,
      },
    ]
  }, [
    allocatedMinutesPerWeek,
    colors.alert,
    colors.mistExtra,
    colors.success,
    doneMinutesThisWeek,
    target,
  ])

  return (
    <VStack gap={4}>
      <HStack fullWidth alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" fullWidth justifyContent="space-between">
          <Text size={14}>
            <ProjectGoalBadge project={project} />
            <Text as="span" style={{ marginLeft: 8 }}>
              {name}
            </Text>
          </Text>
          <Text size={14} as="div" weight="bold">
            <HStackSeparatedBy
              separator={<Text color="shy">{slashSeparator}</Text>}
            >
              <Text>
                {formatDuration(doneMinutesThisWeek, 'min', { maxUnit: 'h' })}
              </Text>
              {allocatedMinutesPerWeek > 0 ? (
                <Text color="supporting">
                  {formatDuration(allocatedMinutesPerWeek, 'min', {
                    maxUnit: 'h',
                  })}
                </Text>
              ) : (
                <Link style={{ justifySelf: 'start' }} href={AppPath.Capacity}>
                  <ShyTextButton as="p" text="set weekly goal" />
                </Link>
              )}
            </HStackSeparatedBy>
          </Text>
        </HStack>
      </HStack>
      <AllocationLine height={4} segments={segments} />
    </VStack>
  )
}
