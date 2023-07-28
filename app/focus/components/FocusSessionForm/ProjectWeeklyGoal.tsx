import { useProjects } from 'projects/hooks/useProjects'
import { Path } from 'router/Path'
import { useWeekday } from 'shared/hooks/useWeekday'
import { formatDuration } from 'shared/utils/formatDuration'
import { sum } from 'shared/utils/sum'
import { ShyTextButton } from '@increaser/ui/ui/buttons/ShyTextButton'
import { Circle } from '@increaser/ui/ui/Circle'
import { Spacer } from '@increaser/ui/ui/Spacer'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@increaser/ui/ui/StackSeparatedBy'
import { Text } from '@increaser/ui/ui/Text'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'
import { WeekdaysProgressBar } from 'capacity/components/WeekdaysProgressBar'
import Link from 'next/link'

interface ProjectWeeklyGoalProps {
  projectId: string
}

export const ProjectWeeklyGoal = ({ projectId }: ProjectWeeklyGoalProps) => {
  const { allocation, totalMinutes } = useWeekTimeAllocation()

  const { projectsRecord } = useProjects()
  const { allocatedMinutesPerWeek, doneMinutesThisWeek, hslaColor } =
    projectsRecord[projectId]
  const weekday = useWeekday()

  const target =
    allocatedMinutesPerWeek *
    (sum(allocation.filter((_, index) => index <= weekday)) / totalMinutes)

  return (
    <VStack gap={4}>
      <HStack fullWidth alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" gap={8}>
          <Circle size={8} background={hslaColor} />
          <Text size={14} as="div" weight="bold">
            <HStackSeparatedBy
              separator={<Text color="shy">{slashSeparator}</Text>}
            >
              <Text>{formatDuration(doneMinutesThisWeek, 'min')}</Text>
              {allocatedMinutesPerWeek > 0 ? (
                <Text color="supporting">
                  {formatDuration(allocatedMinutesPerWeek, 'min')}
                </Text>
              ) : (
                <Link style={{ justifySelf: 'start' }} href={Path.Capacity}>
                  <ShyTextButton as="p" text="set weekly goal" />
                </Link>
              )}
            </HStackSeparatedBy>
          </Text>
        </HStack>
      </HStack>
      {allocatedMinutesPerWeek > 0 ? (
        <WeekdaysProgressBar
          target={target}
          value={doneMinutesThisWeek}
          goal={'awareness'}
          color={hslaColor}
          total={allocatedMinutesPerWeek}
        />
      ) : (
        <Spacer height={4} />
      )}
    </VStack>
  )
}
