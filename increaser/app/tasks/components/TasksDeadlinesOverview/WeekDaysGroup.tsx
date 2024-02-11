import { Task } from '@increaser/entities/Task'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { Center } from '@lib/ui/layout/Center'
import { Circle } from '@lib/ui/layout/Circle'
import { VStack } from '@lib/ui/layout/Stack'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { Text } from '@lib/ui/text'
import { getShortWeekday } from '@lib/utils/time'
import { getWeekday } from '@lib/utils/time/getWeekday'

export type WeekDaysGroupProps = {
  tasks: Task[]
  days: number[]
}

export const WeekDaysGroup = ({ tasks, days }: WeekDaysGroupProps) => {
  const todayStartedAt = useStartOfDay()

  return (
    <VStack gap={4}>
      <UniformColumnGrid gap={4}>
        {days.map((day) => (
          <Center key={day}>
            <Text color={todayStartedAt < day ? 'shy' : 'regular'}>
              {getShortWeekday(getWeekday(new Date(day)))}
            </Text>
          </Center>
        ))}
      </UniformColumnGrid>
      {tasks.map((task) => (
        <Circle key={task.id} size={8} />
      ))}
    </VStack>
  )
}
