import { DnDGroups } from '@lib/dnd/groups/DnDGroups'
import { Wrap } from '@lib/ui/base/Wrap'
import { VStack } from '@lib/ui/css/stack'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { getProjectId } from '@product/entities-utils/project/getProjectId'
import { CreateTask } from '@product/ui/tasks/CreateTask'
import { CurrentTaskProvider } from '@product/ui/tasks/CurrentTaskProvider'
import { TaskItem } from '@product/ui/tasks/TaskItem'
import { endOfDay, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useFilterByProject } from '../../projects/filter/project/state/projectFilter'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { ActiveTask } from '../ActiveTask'
import { RecurringTasksForecast } from '../forecast/RecurringTasksForecast'

import { ScheduledTaskGroupId } from './ScheduledTaskGroupId'
import { TasksGroupHeader } from './TasksGroupHeader'
import { useGroupScheduledTasks } from './useGroupScheduledTasks'
import { useUncompleteScheduledTasks } from './useUncompleteScheduledTasks'

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
  const tasks = useFilterByProject(useUncompleteScheduledTasks(), getProjectId)

  const toGroups = useGroupScheduledTasks()

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const [groups, setGroups] = useState(() => toGroups(tasks))
  useEffect(() => {
    setGroups(toGroups(tasks))
  }, [tasks, toGroups])

  return (
    <VStack gap={32}>
      <ActiveTask />
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

          const deadlineOrder = getNewOrder({
            orders: group.value.map((task) => task.deadlineOrder),
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
              deadlineOrder,
              deadlineAt,
            },
          })

          setGroups(
            toGroups(
              tasks.map((task) =>
                task.id === id ? { ...task, deadlineOrder, deadlineAt } : task,
              ),
            ),
          )
        }}
        renderGroup={({ groupId, props: { children, ...containerProps } }) => (
          <GroupContainer {...containerProps}>
            <TasksGroupHeader value={groupId} />

            <VStack key={groupId}>
              {children}

              {groupId !== 'overdue' && (
                <RecurringTasksForecast value={Number(groupId)} />
              )}
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
          return (
            <CurrentTaskProvider value={item} key={item.id}>
              <Wrap
                wrap={(children) =>
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
                }
                key={item.id}
              >
                <TaskItem />
              </Wrap>
            </CurrentTaskProvider>
          )
        }}
      />
    </VStack>
  )
}
