import { Task, taskStatusName } from '@increaser/entities/Task'
import { TaskBoardContainer } from './TaskBoardContainer'
import { useEffect, useState } from 'react'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { TaskColumnContainer } from './column/TaskColumnContainer'
import { ColumnContent, ColumnHeader } from './column/ColumnHeader'
import { Text } from '@lib/ui/text'
import { TaskColumnContent } from './column/TaskColumnContent'
import { ColumnFooter } from './column/ColumnFooter'
import { AddTaskColumn } from './column/AddTaskColumn'
import { CurrentTaskProvider } from '../CurrentTaskProvider'
import { DnDGroups } from '@lib/dnd/groups/DnDGroups'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { DoneTasksInfo } from './DoneTasksInfo'
import { ActiveTask } from '../ActiveTask'
import { groupTasks } from './utils/groupTasks'
import { DraggableTaskItem } from './item/DraggableTaskItem'
import { ItemsProp } from '@lib/ui/props'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

export const TaskBoard = ({ items }: ItemsProp<Task>) => {
  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const [groups, setGroups] = useState(() => groupTasks(items))
  useEffect(() => {
    setGroups(groupTasks(items))
  }, [items])

  return (
    <ActiveItemIdProvider initialValue={null}>
      <ActiveTask />
      <TaskBoardContainer>
        <DnDGroups
          groups={groups}
          getItemId={(task) => task.id}
          onChange={(id, { index, groupId }) => {
            const group = shouldBePresent(
              groups.find((group) => group.key === groupId),
            )

            const initialGroup = shouldBePresent(
              groups.find((group) =>
                group.value.some((task) => task.id === id),
              ),
            )

            const order = getNewOrder({
              orders: group.value.map((task) => task.order),
              sourceIndex:
                initialGroup.key === group.key
                  ? group.value.findIndex((task) => task.id === id)
                  : null,
              destinationIndex: index,
            })

            updateTask({
              id,
              fields: {
                order,
                status: groupId,
              },
            })

            setGroups(
              groupTasks(
                items.map((task) =>
                  task.id === id ? { ...task, order, status: groupId } : task,
                ),
              ),
            )
          }}
          renderGroup={({
            props: { children, ...containerProps },
            groupId: status,
            isDraggingOver,
          }) => (
            <TaskColumnContainer
              isDraggingOver={isDraggingOver}
              {...containerProps}
            >
              <ColumnHeader>
                <ColumnContent>
                  <Text weight="600">{taskStatusName[status]}</Text>
                </ColumnContent>
              </ColumnHeader>
              <TaskColumnContent>
                {status === 'done' && <DoneTasksInfo />}
                {children}
              </TaskColumnContent>
              <ColumnFooter>
                <AddTaskColumn status={status} />
              </ColumnFooter>
            </TaskColumnContainer>
          )}
          renderItem={({ item, draggableProps, dragHandleProps, status }) => {
            return (
              <CurrentTaskProvider key={item.id} value={item}>
                <DraggableTaskItem
                  status={status}
                  {...draggableProps}
                  {...dragHandleProps}
                />
              </CurrentTaskProvider>
            )
          }}
        />
      </TaskBoardContainer>
    </ActiveItemIdProvider>
  )
}
