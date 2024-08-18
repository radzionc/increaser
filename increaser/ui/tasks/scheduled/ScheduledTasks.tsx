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
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { EditTaskForm } from '../form/EditTaskForm'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getNewOrder } from '@lib/utils/order/getNewOrder'

const getDeadline = (groupId: ScheduledTaskGroupId) => {
  if (groupId === 'overdue') {
    return endOfDay(subDays(Date.now(), 1)).getTime()
  }

  return Number(groupId)
}

const GroupContainer = styled(VStack)`
  gap: 4px;
`

export const ScheduledTasks = () => {
  const tasks = useUncompleteScheduledTasks()

  const [activeItemId] = useActiveItemId()

  const toGroups = useGroupScheduledTasks()

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const [groups, setGroups] = useState(() => toGroups(tasks))
  useEffect(() => {
    setGroups(toGroups(tasks))
  }, [tasks, toGroups])

  return (
    <VStack gap={32}>
      <DnDGroups
        groups={groups}
        getItemId={(task) => task.id}
        onChange={(id, { index, groupId }) => {
          const group = shouldBePresent(
            groups.find((group) => group.key === groupId),
          )

          const initialGroup = shouldBePresent(
            groups.find((group) => group.value.some((task) => task.id === id)),
          )

          const order = getNewOrder({
            orders: group.value.map((task) => task.order),
            sourceIndex:
              initialGroup.key === group.key
                ? group.value.findIndex((task) => task.id === id)
                : null,
            destinationIndex: index,
          })

          const deadlineAt = getDeadline(groupId)

          updateTask({
            id,
            fields: {
              order,
              deadlineAt,
            },
          })

          setGroups(
            toGroups(
              tasks.map((task) =>
                task.id === id ? { ...task, order, deadlineAt } : task,
              ),
            ),
          )
        }}
        renderGroup={({ groupId, props: { children, ...containerProps } }) => (
          <GroupContainer {...containerProps}>
            <TasksGroupHeader value={groupId} />
            {groupId !== 'overdue' && (
              <RecurringTasksForecast value={Number(groupId)} />
            )}

            <VStack key={groupId}>
              {children}
              {groupId !== 'overdue' && (
                <CreateTask
                  defaultValue={{
                    deadlineAt: groupId === 'todo' ? null : Number(groupId),
                  }}
                />
              )}
            </VStack>
          </GroupContainer>
        )}
        renderItem={({ item, draggableProps, dragHandleProps, status }) => {
          const isEditing = activeItemId === item.id

          return (
            <CurrentTaskProvider value={item} key={item.id}>
              {isEditing ? (
                <EditTaskForm />
              ) : (
                <Wrap
                  wrap={
                    activeItemId === null
                      ? (children) =>
                          status === 'overlay' ? (
                            <TightListItemDragOverlay>
                              {children}
                            </TightListItemDragOverlay>
                          ) : (
                            <DraggableTightListItemContainer
                              isDragging={status === 'placeholder'}
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
                  <TaskItem />
                </Wrap>
              )}
            </CurrentTaskProvider>
          )
        }}
      />
    </VStack>
  )
}
