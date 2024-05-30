import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { groupItems } from '@lib/utils/array/groupItems'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  DeadlineStatus,
  Task,
  deadlineName,
  deadlineStatuses,
} from '@increaser/entities/Task'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskItem } from '@increaser/ui/tasks/TaskItem'
import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useCallback, useMemo } from 'react'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { getRecord } from '@lib/utils/record/getRecord'
import { recordMap } from '@lib/utils/record/recordMap'
import { DnDGroups, ItemChangeParams } from '@increaser/ui/tasks/DnDGroups'
import { CreateTask } from '@increaser/ui/tasks/CreateTask'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { DragContainer } from '@increaser/ui/tasks/DragContainer'
import { useTasksManager } from '@increaser/ui/tasks/TasksManagerProvider'
import { TaskDragHandle } from './TaskDragHandle'

export const TasksToDo = () => {
  const { tasks } = useAssertUserState()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))
  const { activeTaskId } = useTasksManager()

  const groups = useMemo(() => {
    return {
      ...recordMap(
        getRecord(getDeadlineTypes(now), (key) => key),
        () => [] as Task[],
      ),
      ...groupItems(
        Object.values(tasks).filter((task) => !task.completedAt),
        (task) =>
          getDeadlineStatus({
            deadlineAt: task.deadlineAt,
            now,
          }),
      ),
    }
  }, [now, tasks])

  const { mutate: updateTask } = useUpdateTaskMutation()

  const onChange = useCallback(
    (id: string, { order, groupId }: ItemChangeParams<DeadlineStatus>) => {
      const fields: Partial<Omit<Task, 'id'>> = {
        order,
      }
      if (groupId !== 'overdue') {
        fields.deadlineAt = getDeadlineAt({
          deadlineType: groupId,
          now,
        })
      } else if (
        getDeadlineStatus({ deadlineAt: tasks[id].deadlineAt, now }) !==
        'overdue'
      ) {
        return
      }

      updateTask({
        id,
        fields,
      })
    },
    [now, tasks, updateTask],
  )

  return (
    <DnDGroups
      groups={groups}
      getGroupOrder={(status) => deadlineStatuses.indexOf(status)}
      getItemId={(task) => task.id}
      getItemOrder={(task) => task.order}
      onChange={onChange}
      renderGroup={({ content, groupId, containerProps }) => (
        <VStack gap={4} key={groupId}>
          <Text
            weight="semibold"
            size={12}
            color={groupId === 'overdue' ? 'idle' : 'supporting'}
          >
            {deadlineName[groupId].toUpperCase()}
          </Text>
          <VStack {...containerProps}>
            {content}
            {groupId !== 'overdue' && (
              <CreateTask
                order={getLastItemOrder(
                  groups[groupId].map((task) => task.order),
                )}
                deadlineType={groupId}
              />
            )}
          </VStack>
        </VStack>
      )}
      renderItem={({
        item,
        draggableProps,
        dragHandleProps,
        isDragging,
        isDraggingEnabled,
      }) => {
        const isEnabled = isDraggingEnabled && !activeTaskId

        return (
          <DragContainer isActive={isDragging ?? false} {...draggableProps}>
            <TaskDragHandle
              isEnabled={isEnabled}
              isActive={isDragging ?? false}
              {...dragHandleProps}
            />
            <CurrentTaskProvider value={item} key={item.id}>
              <TaskItem />
            </CurrentTaskProvider>
          </DragContainer>
        )
      }}
    />
  )
}
