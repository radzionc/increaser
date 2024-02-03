import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { format } from 'date-fns'
import { Task } from '@increaser/entities/Task'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { Center } from '@lib/ui/layout/Center'
import { getShortWeekday } from '@lib/utils/time'
import { Panel } from '@lib/ui/panel/Panel'
import { order } from '@lib/utils/array/order'
import styled from 'styled-components'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { getColor, matchColor } from '@lib/ui/theme/getters'

type WeekDeadlinesOverviewProps = {
  startedAt: number
  name: string
  tasks: Task[]
  showWorkdays?: boolean
}

const TaskStatus = styled.div<{ completed: boolean }>`
  ${round};
  ${sameDimensions(12)};
  background: ${matchColor('completed', {
    true: 'success',
    false: 'mistExtra',
  })};
`

const Container = styled(Panel)`
  height: 100%;
  background: ${getColor('foreground')};
`

export const WeekDeadlinesOverview = ({
  startedAt,
  name,
  tasks,
}: WeekDeadlinesOverviewProps) => {
  const todayStartedAt = useStartOfDay()

  return (
    <Container>
      <VStack gap={16}>
        <VStack gap={4}>
          <HStack alignItems="center" gap={8}>
            <Text color="contrast" weight="semibold" size={14}>
              {name}
            </Text>
            <Text weight="semibold" size={14} color="supporting">
              {format(startedAt, 'MMM d')} -{' '}
              {format(startedAt + convertDuration(1, 'w', 'ms'), 'MMM d')}
            </Text>
          </HStack>
          <UniformColumnGrid gap={4}>
            {range(convertDuration(1, 'w', 'd')).map((dayIndex) => {
              const dayStartedAt =
                startedAt + convertDuration(dayIndex, 'd', 'ms')

              const isToday = todayStartedAt === dayStartedAt
              return (
                <Center key={dayStartedAt}>
                  <Text
                    size={12}
                    weight={isToday ? 'bold' : 'regular'}
                    color={isToday ? 'primary' : 'shy'}
                  >
                    {getShortWeekday(dayIndex)}
                  </Text>
                </Center>
              )
            })}
          </UniformColumnGrid>
        </VStack>
        <HStack alignItems="center" gap={4} wrap="wrap">
          {order(tasks, (task) => task.completedAt ?? 0, 'desc').map((task) => (
            <TaskStatus completed={!!task.completedAt} key={task.id} />
          ))}
        </HStack>
      </VStack>
    </Container>
  )
}
