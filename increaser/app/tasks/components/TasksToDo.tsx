import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { groupItems } from '@lib/utils/array/groupItems'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  DeadlineStatus,
  DeadlineType,
  deadlineName,
} from '@increaser/entities/Task'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { TaskItem } from './TaskItem'
import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'
import { CreateTask } from './CreateTask'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { order } from '@lib/utils/array/order'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'

export const TasksToDo = () => {
  const { tasks } = useAssertUserState()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const groupedTasks = groupItems(
    Object.values(tasks).filter((task) => !task.completedAt),
    (task) =>
      getDeadlineStatus({
        deadlineAt: task.deadlineAt,
        now,
      }),
  )

  const groups = withoutUndefined([
    groupedTasks.overdue ? ('overdue' as DeadlineStatus) : undefined,
    ...getDeadlineTypes(now),
  ])

  return (
    <>
      {groups.map((status) => {
        const tasks = order(
          groupedTasks[status] || [],
          (task) => task.order,
          'asc',
        )

        return (
          <VStack gap={4} key={status}>
            <Text
              weight="semibold"
              size={12}
              color={status === 'overdue' ? 'idle' : 'supporting'}
            >
              {deadlineName[status as DeadlineType].toUpperCase()}
            </Text>
            <VStack>
              {tasks.map((task) => (
                <CurrentTaskProvider value={task} key={task.id}>
                  <TaskItem />
                </CurrentTaskProvider>
              ))}
              {status !== 'overdue' && (
                <CreateTask
                  order={getLastItemOrder(tasks.map((task) => task.order))}
                  deadlineType={status}
                />
              )}
            </VStack>
          </VStack>
        )
      })}
    </>
  )
}
