import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { groupItems } from '@lib/utils/array/groupItems'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  DeadlineStatus,
  Task,
  deadlineName,
  deadlineStatuses,
} from '@increaser/entities/Task'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { TaskItem } from './TaskItem'
import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useCallback, useMemo } from 'react'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { getRecord } from '@lib/utils/record/getRecord'
import { recordMap } from '@lib/utils/record/recordMap'
import { DnDGroups, ItemChangeParams } from './DnDGroups'
import { CreateTask } from './CreateTask'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { DragContainer, OnHoverDragContainer } from './DragContainer'
import { DragHandle } from '@lib/ui/dnd/DragHandle'
import { GripVerticalIcon } from '@lib/ui/icons/GripVerticalIcon'
import { useMedia } from 'react-use'
import {
  checklistItemContentMinHeight,
  checklistItemVerticalPadding,
} from '@lib/ui/checklist/ChecklistItemFrame'
import { useTasksManager } from './TasksManagerProvider'

const hoverableDragHandleWidth = 36

export const TasksToDo = () => {
  const { tasks } = useAssertUserState()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))
  const { activeTaskId } = useTasksManager()

  const isHoverEnabled = useMedia('(hover: hover) and (pointer: fine)')

  const groups = useMemo(() => {
    return {
      ...recordMap(
        getRecord(getDeadlineTypes(now), (key) => key),
        () => [] as Task[],
      ),
      ...groupItems(
        Object.values(tasks).filter((task) => !task.completedAt),
        (task) =>
          getDeadlineStatus({
            deadlineAt: task.deadlineAt,
            now,
          }),
      ),
    }
  }, [now, tasks])

  const { mutate: updateTask } = useUpdateTaskMutation()

  const onChange = useCallback(
    (id: string, { order, groupId }: ItemChangeParams<DeadlineStatus>) => {
      const fields: Partial<Omit<Task, 'id'>> = {
        order,
      }
      if (groupId !== 'overdue') {
        fields.deadlineAt = getDeadlineAt({
          deadlineType: groupId,
          now,
        })
      } else if (
        getDeadlineStatus({ deadlineAt: tasks[id].deadlineAt, now }) !==
        'overdue'
      ) {
        return
      }

      updateTask({
        id,
        fields,
      })
    },
    [now, tasks, updateTask],
  )

  return (
    <DnDGroups
      groups={groups}
      getGroupOrder={(status) => deadlineStatuses.indexOf(status)}
      getItemId={(task) => task.id}
      getItemOrder={(task) => task.order}
      onChange={onChange}
      renderGroup={({ content, groupId, containerProps }) => (
        <VStack gap={4} key={groupId}>
          <Text
            weight="semibold"
            size={12}
            color={groupId === 'overdue' ? 'idle' : 'supporting'}
          >
            {deadlineName[groupId].toUpperCase()}
          </Text>
          <VStack {...containerProps}>
            {content}
            {groupId !== 'overdue' && (
              <CreateTask
                order={getLastItemOrder(
                  groups[groupId].map((task) => task.order),
                )}
                deadlineType={groupId}
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
        const content = (
          <CurrentTaskProvider value={item} key={item.id}>
            <TaskItem />
          </CurrentTaskProvider>
        )

        if (activeTaskId) {
          return content
        }

        const dragHandle = (
          <DragHandle
            style={
              isHoverEnabled
                ? {
                    position: 'absolute',
                    top: 0,
                    left: -hoverableDragHandleWidth,
                    width: hoverableDragHandleWidth,
                    height:
                      checklistItemContentMinHeight +
                      checklistItemVerticalPadding * 2,
                  }
                : {
                    width: 40,
                  }
            }
            isActive={isDragging}
            {...dragHandleProps}
          >
            <GripVerticalIcon />
          </DragHandle>
        )
        if (isHoverEnabled) {
          return (
            <OnHoverDragContainer
              isDraggingEnabled={isDraggingEnabled}
              isDragging={isDragging}
              {...draggableProps}
            >
              {dragHandle}
              {content}
            </OnHoverDragContainer>
          )
        }

        return (
          <DragContainer {...draggableProps}>
            {dragHandle}
            {content}
          </DragContainer>
        )
      }}
    />
  )
}
