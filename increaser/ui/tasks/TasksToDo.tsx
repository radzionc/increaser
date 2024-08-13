import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskItem } from '@increaser/ui/tasks/TaskItem'
import { useCallback } from 'react'
import { DnDGroups, ItemChangeParams } from '@lib/dnd/DnDGroups'
import { CreateTask } from '@increaser/ui/tasks/CreateTask'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { TaskDragHandle } from './TaskDragHandle'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TasksGroupHeader } from './TasksGroupHeader'
import { RecurringTasksForecast } from './forecast/RecurringTasksForecast'
import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import {
  SpecialTodoTaskGroup,
  specialTodoTaskGroups,
  TodoTaskGroupId,
} from './TodoTaskGroupId'
import { without } from '@lib/utils/array/without'
import { useGroupedTasksToDo } from './timeGrouping/useGroupedTasksToDo'
import { endOfDay, subDays } from 'date-fns'

const getDeadline = (groupId: TodoTaskGroupId) => {
  if (groupId === 'overdue') {
    return endOfDay(subDays(Date.now(), 1)).getTime()
  }

  if (groupId === 'todo') {
    return null
  }

  return Number(groupId)
}

export const TasksToDo = () => {
  const [activeTaskId] = useActiveItemId()

  const groups = useGroupedTasksToDo()

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const onChange = useCallback(
    (id: string, { order, groupId }: ItemChangeParams<TodoTaskGroupId>) => {
      updateTask({
        id,
        fields: {
          order,
          deadlineAt: getDeadline(groupId),
        },
      })
    },
    [updateTask],
  )

  return (
    <DnDGroups
      groups={groups}
      getGroupOrder={(groupId) => {
        if (specialTodoTaskGroups.includes(groupId as SpecialTodoTaskGroup)) {
          const offset = -(
            specialTodoTaskGroups.indexOf(groupId as SpecialTodoTaskGroup) + 1
          )
          const minDeadline = Math.min(
            ...without(Object.keys(groups), ...specialTodoTaskGroups).map(
              (group) => Number(group),
            ),
            0,
          )
          return minDeadline + offset
        }

        return Number(groupId)
      }}
      getItemId={(task) => task.id}
      getItemOrder={(task) => task.order}
      onChange={onChange}
      renderGroup={({ content, groupId, containerProps }) => (
        <VStack {...containerProps} gap={4} key={groupId}>
          <TasksGroupHeader value={groupId} />
          {!specialTodoTaskGroups.includes(groupId as SpecialTodoTaskGroup) && (
            <RecurringTasksForecast value={Number(groupId)} />
          )}

          <VStack>
            {content}
            {groupId !== 'overdue' && (
              <CreateTask
                defaultValue={{
                  deadlineAt: groupId === 'todo' ? null : Number(groupId),
                }}
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
