import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskItem } from '@increaser/ui/tasks/TaskItem'
import { CreateTask } from '@increaser/ui/tasks/CreateTask'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

import { endOfDay, subDays } from 'date-fns'
import { ScheduledTaskGroupId } from './ScheduledTaskGroupId'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { TasksGroupHeader } from './TasksGroupHeader'
import { RecurringTasksForecast } from '../forecast/RecurringTasksForecast'
import { DnDGroups } from '@lib/dnd/groups/DnDGroups'
import { Wrap } from '@lib/ui/base/Wrap'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { useUncompleteScheduledTasks } from './useUncompleteScheduledTasks'
import { useGroupScheduledTasks } from './useGroupScheduledTasks'

const getDeadline = (groupId: ScheduledTaskGroupId) => {
  if (groupId === 'overdue') {
    return endOfDay(subDays(Date.now(), 1)).getTime()
  }

  return Number(groupId)
}

export const ScheduledTasks = () => {
  const tasks = useUncompleteScheduledTasks()

  const [activeItemId] = useActiveItemId()

  const toGroups = useGroupScheduledTasks()

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  return (
    <DnDGroups
      items={tasks}
      toGroups={toGroups}
      getGroupOrder={(groupId) => {
        if (groupId === 'overdue') {
          return -1
        }

        return Number(groupId)
      }}
      getItemId={(task) => task.id}
      getItemOrder={(task) => task.order}
      onChange={({ id, order, groupId }) => {
        updateTask({
          id,
          fields: {
            order,
            deadlineAt: getDeadline(groupId),
          },
        })
      }}
      simulateChange={(items, { id, order, groupId }) => {
        return items.map((item) =>
          item.id === id
            ? { ...item, order, deadlineAt: getDeadline(groupId) }
            : item,
        )
      }}
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
      renderItem={({ item, draggableProps, dragHandleProps, isDragging }) => {
        return (
          <Wrap
            wrap={
              activeItemId === null
                ? (children) => (
                    <DraggableTightListItemContainer
                      isDragging={isDragging}
                      key={item.id}
                      {...draggableProps}
                      {...dragHandleProps}
                    >
                      {children}
                    </DraggableTightListItemContainer>
                  )
                : undefined
            }
            key={item.id}
          >
            <CurrentTaskProvider value={item} key={item.id}>
              <TaskItem />
            </CurrentTaskProvider>
          </Wrap>
        )
      }}
      renderDragOverlay={({ item }) => (
        <TightListItemDragOverlay>
          <CurrentTaskProvider value={item} key={item.id}>
            <TaskItem />
          </CurrentTaskProvider>
        </TightListItemDragOverlay>
      )}
    />
  )
}
