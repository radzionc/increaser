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
import styled, { css } from 'styled-components'
import { ItemChangeParams } from '@lib/dnd/DnDGroupsDeprecated'
import { DnDGroups } from '@lib/dnd/DnDGroups'
import { match } from '@lib/utils/match'
import { getColor } from '@lib/ui/theme/getters'

type DraggableItemStatus = 'idle' | 'overlay' | 'shadow'
const DraggableTaskItem = styled(TaskItem)<{ status: DraggableItemStatus }>`
  ${({ status }) =>
    match(status, {
      idle: () => css``,
      overlay: () => css`
        cursor: grabbing;
        border-color: ${getColor('mistExtra')};
        &:hover {
          border-color: ${getColor('mistExtra')};
        }
      `,
      shadow: () => css`
        opacity: 0.4;
      `,
    })}
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
      <DnDGroups
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
        renderItem={({ item, draggableProps, dragHandleProps, isDragging }) => {
          return (
            <CurrentTaskProvider key={item.id} value={item}>
              <DraggableTaskItem
                status={isDragging ? 'shadow' : 'idle'}
                {...draggableProps}
                {...dragHandleProps}
              />
            </CurrentTaskProvider>
          )
        }}
        renderDragOverlay={({ item }) => (
          <CurrentTaskProvider value={item}>
            <DraggableTaskItem status="overlay" />
          </CurrentTaskProvider>
        )}
      />
    </TaskBoardContainer>
  )
}
