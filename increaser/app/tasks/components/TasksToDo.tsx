import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { groupItems } from '@lib/utils/array/groupItems'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  DeadlineStatus,
  DeadlineType,
  Task,
  deadlineName,
} from '@increaser/entities/Task'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { TaskItem } from './TaskItem'
import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'
import { CreateTask } from './CreateTask'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { order } from '@lib/utils/array/order'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import { useCallback, useState } from 'react'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import styled, { css } from 'styled-components'
import { GripVerticalIcon } from '@lib/ui/icons/GripVerticalIcon'
import { centerContent } from '@lib/ui/css/centerContent'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { defaultTransition } from '@lib/ui/css/transition'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const dragHandleWidth = 36

const DragHandle = styled.div<{ isDragging?: boolean }>`
  position: absolute;
  left: -${toSizeUnit(dragHandleWidth)};
  height: 40px;
  width: ${toSizeUnit(dragHandleWidth)};
  font-size: 20px;
  ${centerContent};
  color: ${matchColor('isDragging', {
    true: 'contrast',
    false: 'textSupporting',
  })};
  transition: color ${defaultTransition};
  ${({ isDragging }) =>
    !isDragging &&
    css`
      &:hover {
        color: ${getColor('text')};
      }
    `}

  @media (hover: hover) and (pointer: fine) {
    &:not(:focus-within) {
      opacity: ${({ isDragging }) => (isDragging ? 1 : 0)};
    }
  }
`

const TaskItemWrapper = styled(HStack)<{ isDisabled?: boolean }>`
  width: 100%;
  align-items: center;
  position: relative;
  background: ${getColor('background')};
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `}

  &:hover ${DragHandle} {
    opacity: 1;
  }
`

export const TasksToDo = () => {
  const { tasks } = useAssertUserState()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const groupedTasks = groupItems(
    Object.values(tasks).filter((task) => !task.completedAt),
    (task) =>
      getDeadlineStatus({
        deadlineAt: task.deadlineAt,
        now,
      }),
  )

  const { mutate: updateTask } = useUpdateTaskMutation()

  const groups = withoutUndefined([
    groupedTasks.overdue ? ('overdue' as DeadlineStatus) : undefined,
    ...getDeadlineTypes(now),
  ])

  const [currentDraggedTaskId, setCurrentDraggedTaskId] = useState<
    string | null
  >(null)

  const handleDragEnd: OnDragEndResponder = useCallback(
    ({ destination, source, draggableId }) => {
      setCurrentDraggedTaskId(null)
      if (!destination) {
        return
      }

      const isSameGroup = destination.droppableId === source.droppableId

      if (isSameGroup && destination.index === source.index) {
        return
      }

      const group = destination.droppableId as DeadlineStatus

      const tasks = groupedTasks[group] || []

      const fields: Partial<Omit<Task, 'id'>> = {
        order: getNewOrder({
          orders: tasks.map((task) => task.order),
          sourceIndex: isSameGroup ? source.index : null,
          destinationIndex: destination.index,
        }),
      }

      if (group !== 'overdue') {
        fields.deadlineAt = getDeadlineAt({
          deadlineType: group,
          now,
        })
      }

      updateTask({
        id: draggableId,
        fields,
      })
    },
    [groupedTasks, now, updateTask],
  )

  return (
    <DragDropContext
      onDragStart={({ draggableId }) => setCurrentDraggedTaskId(draggableId)}
      onDragEnd={handleDragEnd}
    >
      {groups.map((status) => {
        const tasks = order(
          groupedTasks[status] || [],
          (task) => task.order,
          'asc',
        )

        return (
          <VStack gap={4} key={status}>
            <Text
              weight="semibold"
              size={12}
              color={status === 'overdue' ? 'idle' : 'supporting'}
            >
              {deadlineName[status as DeadlineType].toUpperCase()}
            </Text>
            <Droppable droppableId={status}>
              {(provided) => {
                return (
                  <VStack ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        index={index}
                        draggableId={task.id}
                      >
                        {(provided, { isDragging }) => (
                          <TaskItemWrapper
                            ref={provided.innerRef}
                            isDisabled={
                              currentDraggedTaskId !== null &&
                              task.id !== currentDraggedTaskId
                            }
                            {...provided.draggableProps}
                          >
                            <DragHandle
                              {...provided.dragHandleProps}
                              isDragging={isDragging}
                            >
                              <GripVerticalIcon />
                            </DragHandle>
                            <CurrentTaskProvider value={task} key={task.id}>
                              <TaskItem />
                            </CurrentTaskProvider>
                          </TaskItemWrapper>
                        )}
                      </Draggable>
                    ))}
                    <>{provided.placeholder}</>
                    {status !== 'overdue' && (
                      <CreateTask
                        order={getLastItemOrder(
                          tasks.map((task) => task.order),
                        )}
                        deadlineType={status}
                      />
                    )}
                  </VStack>
                )
              }}
            </Droppable>
          </VStack>
        )
      })}
    </DragDropContext>
  )
}
