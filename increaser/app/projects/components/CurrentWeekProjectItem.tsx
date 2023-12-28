import { formatDuration } from '@lib/utils/time/formatDuration'
import { useTheme } from 'styled-components'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { Text } from '@lib/ui/text'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'
import { EnhancedProject } from '@increaser/app/projects/Project'

export const CurrentWeekProjectItem = ({
  doneMinutesThisWeek,
  allocatedMinutesPerWeek,
  emoji,
  name,
  color,
  status,
}: EnhancedProject) => {
  const theme = useTheme()

  const isUnderBudget = !!(
    allocatedMinutesPerWeek && allocatedMinutesPerWeek > doneMinutesThisWeek
  )

  const isActive = status === 'ACTIVE'

  return (
    <HStack
      fullWidth
      style={{ overflow: 'hidden' }}
      alignItems="center"
      gap={12}
    >
      <Text color={isActive ? 'contrast' : 'shy'} height="small" size={40}>
        {emoji}
      </Text>
      <VStack
        style={{ overflow: 'hidden', flex: 1 }}
        fullWidth
        alignItems="start"
        gap={2}
      >
        <Text
          cropped
          color={isActive ? 'regular' : 'supporting'}
          weight="semibold"
        >
          {name}
        </Text>
        <VStack style={{ fontSize: 14 }} gap={2} fullWidth>
          <HStack gap={4} alignItems="center">
            <HStackSeparatedBy
              gap={4}
              separator={<Text color="shy">{slashSeparator}</Text>}
            >
              <Text color="supporting" weight="bold">
                {formatDuration(doneMinutesThisWeek, 'min', { maxUnit: 'h' })}
              </Text>
              {allocatedMinutesPerWeek && (
                <Text color="shy" weight="bold">
                  {formatDuration(allocatedMinutesPerWeek, 'min', {
                    maxUnit: 'h',
                  })}
                </Text>
              )}
            </HStackSeparatedBy>
          </HStack>
          <VStack
            fullWidth
            style={{
              opacity: allocatedMinutesPerWeek ? undefined : 0,
            }}
          >
            <AllocationLine
              height={4}
              segments={[
                {
                  proportion: allocatedMinutesPerWeek
                    ? doneMinutesThisWeek / allocatedMinutesPerWeek
                    : 1,
                  color: isUnderBudget
                    ? theme.colors.textShy
                    : theme.colors.getLabelColor(color),
                },
              ]}
            />
          </VStack>
        </VStack>
      </VStack>
    </HStack>
  )
}
