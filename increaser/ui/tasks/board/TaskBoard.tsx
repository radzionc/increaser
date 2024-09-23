import {
  Task,
  TaskStatus,
  taskStatuses,
  taskStatusName,
} from '@increaser/entities/Task'
import { TaskBoardContainer } from './TaskBoardContainer'
import { useCallback, useEffect, useState } from 'react'
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
import { useTasks } from '../hooks/useTasks'
import { groupItems } from '@lib/utils/array/groupItems'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { DnDItemStatus } from '@lib/dnd/DnDItemStatus'
import { recordMap } from '@lib/utils/record/recordMap'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { toEntries } from '@lib/utils/record/toEntries'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { DoneTasksInfo } from './DoneTasksInfo'
import { useFilterByProject } from '../../projects/filter/project/state/projectFilter'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'

const DraggableTaskItem = styled(TaskItem)<{ status: DnDItemStatus }>`
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
      placeholder: () => css`
        opacity: 0.4;
      `,
    })}
`

export const TaskBoard = () => {
  const tasks = useFilterByProject(useTasks(), getProjectId)

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const toGroups = useCallback((items: Task[]) => {
    return toEntries<TaskStatus, Task[]>({
      ...makeRecord(taskStatuses, () => []),
      ...recordMap(
        groupItems<Task, TaskStatus>(
          Object.values(items),
          (task) => task.status,
        ),
        sortEntitiesWithOrder,
      ),
    })
  }, [])

  const [groups, setGroups] = useState(() => toGroups(tasks))
  useEffect(() => {
    setGroups(toGroups(tasks))
  }, [tasks, toGroups])

  return (
    <TaskBoardContainer>
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

          console.log({
            orders: group.value.map((task) => task.order),
            sourceIndex:
              initialGroup.key === group.key
                ? group.value.findIndex((task) => task.id === id)
                : null,
            destinationIndex: index,
          })

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
            toGroups(
              tasks.map((task) =>
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
              <AddTask status={status} />
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
  )
}
