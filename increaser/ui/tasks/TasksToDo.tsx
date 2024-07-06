import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { groupItems } from '@lib/utils/array/groupItems'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { DeadlineStatus, Task } from '@increaser/entities/Task'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskItem } from '@increaser/ui/tasks/TaskItem'
import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useCallback, useMemo } from 'react'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { toRecord } from '@lib/utils/record/toRecord'
import { recordMap } from '@lib/utils/record/recordMap'
import { DnDGroups, ItemChangeParams } from '@lib/dnd/DnDGroups'
import { CreateTask } from '@increaser/ui/tasks/CreateTask'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { TaskDragHandle } from './TaskDragHandle'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TasksGroupHeader } from './TasksGroupHeader'
import { useScheduledTasks } from './hooks/useScheduledTasks'
import { useAssertUserState } from '../user/UserStateContext'

export const TasksToDo = () => {
  const { tasks: tasksRecord } = useAssertUserState()
  const tasks = useScheduledTasks()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))
  const [activeTaskId] = useActiveItemId()

  const deadlineTypes = useMemo(() => getDeadlineTypes(now), [now])

  const groups = useMemo(() => {
    return {
      ...recordMap(
        toRecord(deadlineTypes, (key) => key),
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
  }, [deadlineTypes, now, tasks])

  const { mutate: updateTask } = useUpdateTaskMutation()

  const onChange = useCallback(
    (id: string, { order, groupId }: ItemChangeParams<DeadlineStatus>) => {
      const fields: Partial<Omit<Task, 'id'>> = {
        order,
      }
      if (groupId !== 'overdue') {
        fields.deadlineAt =
          groupId === 'none'
            ? null
            : getDeadlineAt({
                deadlineType: groupId,
                now,
              })
      } else if (
        getDeadlineStatus({ deadlineAt: tasksRecord[id].deadlineAt, now }) !==
        'overdue'
      ) {
        return
      }

      updateTask({
        id,
        fields,
      })
    },
    [now, tasksRecord, updateTask],
  )

  return (
    <DnDGroups
      groups={groups}
      getGroupOrder={(status) =>
        status === 'overdue' || status === 'none'
          ? 0
          : deadlineTypes.indexOf(status) + 1
      }
      getItemId={(task) => task.id}
      getItemOrder={(task) => task.order}
      onChange={onChange}
      renderGroup={({ content, groupId, containerProps }) => (
        <VStack gap={4} key={groupId}>
          <TasksGroupHeader value={groupId} />
          <VStack {...containerProps}>
            {content}
            {groupId !== 'overdue' && (
              <CreateTask
                order={getLastItemOrder(
                  groups[groupId].map((task) => task.order),
                )}
                deadlineType={groupId === 'none' ? null : groupId}
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
          <DraggableItemContainer
            isActive={isDragging ?? false}
            {...draggableProps}
          >
            <TaskDragHandle
              isEnabled={isEnabled}
              isActive={isDragging ?? false}
              {...dragHandleProps}
            />
            <CurrentTaskProvider value={item} key={item.id}>
              <TaskItem />
            </CurrentTaskProvider>
          </DraggableItemContainer>
        )
      }}
    />
  )
}
