import {
  TaskStatus,
  taskStatuses,
  taskStatusName,
} from '@increaser/entities/Task'
import { useGroupedByStatusTasks } from '../status/useGroupedByStatusTasks'
import { TaskBoardContainer } from './TaskBoardContainer'
import { useCallback } from 'react'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { TaskColumnContainer } from './column/TaskColumnContainer'
import { ColumnContent, ColumnHeader } from './column/ColumnHeader'
import { Text } from '@lib/ui/text'
import { TaskColumnContent } from './column/TaskColumnContent'
import { ColumnFooter } from './column/ColumnFooter'
import { AddTask } from './column/AddTask'
import { CurrentTaskProvider } from '../CurrentTaskProvider'
import { TaskItem } from './item/TaskItem'
import styled from 'styled-components'
import { DnDGroupsDeprecated, ItemChangeParams } from '@lib/dnd/DnDGroups'

const TaskItemContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`

export const TaskBoard = () => {
  const tasks = useGroupedByStatusTasks()

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const onChange = useCallback(
    (id: string, { order, groupId }: ItemChangeParams<TaskStatus>) => {
      updateTask({
        id,
        fields: {
          order,
          status: groupId,
        },
      })
    },
    [updateTask],
  )

  return (
    <TaskBoardContainer>
      <DnDGroupsDeprecated
        groups={tasks}
        getGroupOrder={(status) => taskStatuses.indexOf(status)}
        getItemId={(task) => task.id}
        getItemOrder={(task) => task.order}
        onChange={onChange}
        renderGroup={({
          content,
          groupId: status,
          containerProps,
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
            <TaskColumnContent>{content}</TaskColumnContent>
            <ColumnFooter>
              <AddTask status={status} />
            </ColumnFooter>
          </TaskColumnContainer>
        )}
        renderItem={({ item, draggableProps, dragHandleProps }) => {
          return (
            <TaskItemContainer
              key={item.id}
              {...draggableProps}
              {...dragHandleProps}
            >
              <CurrentTaskProvider value={item}>
                <TaskItem />
              </CurrentTaskProvider>
            </TaskItemContainer>
          )
        }}
      />
    </TaskBoardContainer>
  )
}
