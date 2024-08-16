import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskItem } from '@increaser/ui/tasks/TaskItem'
import { useCallback } from 'react'
import { CreateTask } from '@increaser/ui/tasks/CreateTask'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

import { without } from '@lib/utils/array/without'
import { endOfDay, subDays } from 'date-fns'
import { ScheduledTaskGroupId } from './ScheduledTaskGroupId'
import { useGroupedScheduledTasks } from './useGroupedScheduledTasks'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { TasksGroupHeader } from './TasksGroupHeader'
import { RecurringTasksForecast } from '../forecast/RecurringTasksForecast'
import { TaskDragHandle } from '../TaskDragHandle'
import {
  DnDGroupsDeprecated,
  ItemChangeParams,
} from '@lib/dnd/groups/DnDGroupsDeprecated'

const getDeadline = (groupId: ScheduledTaskGroupId) => {
  if (groupId === 'overdue') {
    return endOfDay(subDays(Date.now(), 1)).getTime()
  }

  return Number(groupId)
}

export const ScheduledTasks = () => {
  const [activeTaskId] = useActiveItemId()

  const groups = useGroupedScheduledTasks()

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const onChange = useCallback(
    (
      id: string,
      { order, groupId }: ItemChangeParams<ScheduledTaskGroupId>,
    ) => {
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
    <DnDGroupsDeprecated
      groups={groups}
      getGroupOrder={(groupId) => {
        if (groupId === 'overdue') {
          const minDeadline = Math.min(
            ...without(Object.keys(groups), 'overdue').map((group) =>
              Number(group),
            ),
            0,
          )
          return minDeadline - 1
        }

        return Number(groupId)
      }}
      getItemId={(task) => task.id}
      getItemOrder={(task) => task.order}
      onChange={onChange}
      renderGroup={({ content, groupId, containerProps }) => (
        <VStack {...containerProps} gap={4} key={groupId}>
          <TasksGroupHeader value={groupId} />
          {groupId !== 'overdue' && (
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
