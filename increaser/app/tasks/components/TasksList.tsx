import { getDeadlineType } from '@increaser/entities-utils/task/getDeadlineType'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { groupItems } from '@lib/utils/array/groupItems'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { TaskItem } from './TaskItem'
import { Text } from '@lib/ui/text'
import {
  DeadlineType,
  deadlineName,
  deadlineTypes,
} from '@increaser/entities/Task'

export const TasksList = () => {
  const { tasks } = useAssertUserState()

  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const groupedTasks = groupItems(tasks, (task) =>
    getDeadlineType({
      deadlineAt: task.deadlineAt,
      now,
    }),
  )

  return (
    <VStack gap={8}>
      {deadlineTypes.map((deadlineType) => {
        const tasks = groupedTasks[deadlineType]
        if (!tasks) {
          return null
        }

        return (
          <VStack gap={4} key={deadlineType}>
            <Text weight="bold" size={12} color="supporting">
              {deadlineName[deadlineType as DeadlineType].toUpperCase()}
            </Text>
            {tasks.map((task) => (
              <CurrentTaskProvider value={task} key={task.id}>
                <TaskItem />
              </CurrentTaskProvider>
            ))}
          </VStack>
        )
      })}
    </VStack>
  )
}
