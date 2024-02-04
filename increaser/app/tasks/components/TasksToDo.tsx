import { getDeadlineType } from '@increaser/entities-utils/task/getDeadlineType'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { groupItems } from '@lib/utils/array/groupItems'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { DeadlineType, deadlineName } from '@increaser/entities/Task'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { TaskItem } from './TaskItem'
import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'
import { CreateTask } from './CreateTask'

export const TasksToDo = () => {
  const { tasks } = useAssertUserState()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const groupedTasks = groupItems(
    Object.values(tasks).filter((task) => !task.completedAt),
    (task) =>
      getDeadlineType({
        deadlineAt: task.deadlineAt,
        now,
      }),
  )

  const deadlineTypes = getDeadlineTypes(now)

  return (
    <>
      {deadlineTypes.map((deadlineType) => {
        return (
          <VStack key={deadlineType}>
            <Text weight="semibold" size={12} color="supporting">
              {deadlineName[deadlineType as DeadlineType].toUpperCase()}
            </Text>
            {groupedTasks[deadlineType]?.map((task) => (
              <CurrentTaskProvider value={task} key={task.id}>
                <TaskItem />
              </CurrentTaskProvider>
            ))}
            <CreateTask deadlineType={deadlineType} />
          </VStack>
        )
      })}
    </>
  )
}
