import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Task } from '@increaser/entities/Task'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskItem } from '@increaser/ui/tasks/TaskItem'
import { useCallback, useMemo } from 'react'
import { DnDGroups, ItemChangeParams } from '@lib/dnd/DnDGroups'
import { CreateTask } from '@increaser/ui/tasks/CreateTask'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { TaskDragHandle } from './TaskDragHandle'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TasksGroupHeader } from './TasksGroupHeader'
import { endOfDay, endOfMonth } from 'date-fns'
import { range } from '@lib/utils/array/range'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'
import { RecurringTasksForecast } from './RecurringTasksForecast'
import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { useFilteredScheduledTasksToDo } from './useFilteredScheduledTasksToDo'

export const TasksToDo = () => {
  const tasks = useFilteredScheduledTasksToDo()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))
  const [activeTaskId] = useActiveItemId()

  const lastDayEndsAt = useMemo(() => {
    const tomorrowEndsAt =
      endOfDay(now).getTime() + convertDuration(1, 'd', 'ms')
    const maxTaskDeadlineAt = Math.max(...tasks.map((task) => task.deadlineAt))
    const nextWeekEndsAt = getWeekEndedAt(now) + convertDuration(1, 'w', 'ms')
    const thisMonthEndsAt = endOfMonth(now).getTime()

    return endOfDay(
      Math.max(
        tomorrowEndsAt,
        maxTaskDeadlineAt,
        nextWeekEndsAt,
        thisMonthEndsAt,
      ),
    ).getTime()
  }, [now, tasks])

  const groups = useMemo(() => {
    const todayEndsAt = endOfDay(now).getTime()
    const daysCount =
      Math.round(convertDuration(lastDayEndsAt - todayEndsAt, 'ms', 'd')) + 1

    const result: Record<string, Task[]> = {}

    range(daysCount).forEach((index) => {
      const dayEndsAt = todayEndsAt + convertDuration(index, 'd', 'ms')
      const key = dayEndsAt.toString()
      result[key] = []
    })

    tasks.forEach((task) => {
      const key = (
        task.deadlineAt < now
          ? todayEndsAt - convertDuration(1, 'd', 'ms')
          : task.deadlineAt
      ).toString()
      result[key] = result[key] || []
      result[key].push(task)
    })

    return result
  }, [lastDayEndsAt, now, tasks])

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const onChange = useCallback(
    (id: string, { order, groupId }: ItemChangeParams<string>) => {
      updateTask({
        id,
        fields: {
          order,
          deadlineAt: Number(groupId),
        },
      })
    },
    [updateTask],
  )

  return (
    <DnDGroups
      groups={groups}
      getGroupOrder={(groupId) => Number(groupId)}
      getItemId={(task) => task.id}
      getItemOrder={(task) => task.order}
      onChange={onChange}
      renderGroup={({ content, groupId, containerProps }) => (
        <VStack {...containerProps} gap={4} key={groupId}>
          <TasksGroupHeader value={Number(groupId)} />
          <RecurringTasksForecast dayEndsAt={Number(groupId)} />
          <VStack>
            {content}
            {groupId !== 'overdue' && (
              <CreateTask deadlineAt={Number(groupId)} />
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
