import {
  Task,
  TaskStatus,
  taskStatuses,
  taskStatusName,
} from '@increaser/entities/Task'
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
import { DnDGroups } from '@lib/dnd/groups/DnDGroups'
import { match } from '@lib/utils/match'
import { getColor } from '@lib/ui/theme/getters'
import { useFilterByProject } from '../../projects/filter/useFilterByProject'
import { useTasks } from '../hooks/useTasks'
import { groupItems } from '@lib/utils/array/groupItems'
import { makeRecord } from '@lib/utils/record/makeRecord'

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

const getTaskProjectId = (task: Task) => task.projectId

export const TaskBoard = () => {
  const tasks = useFilterByProject(useTasks(), getTaskProjectId)

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const toGroups = useCallback((items: Task[]) => {
    return {
      ...makeRecord(taskStatuses, () => []),
      ...groupItems<Task, TaskStatus>(
        Object.values(items),
        (task) => task.status,
      ),
    }
  }, [])

  return (
    <TaskBoardContainer>
      <DnDGroups
        items={tasks}
        toGroups={toGroups}
        getGroupOrder={(status) => taskStatuses.indexOf(status)}
        getItemId={(task) => task.id}
        getItemOrder={(task) => task.order}
        onChange={({ id, order, groupId }) => {
          updateTask({
            id,
            fields: {
              order,
              status: groupId,
            },
          })
        }}
        simulateChange={(items, { id, order, groupId }) => {
          return items.map((item) =>
            item.id === id ? { ...item, order, status: groupId } : item,
          )
        }}
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
