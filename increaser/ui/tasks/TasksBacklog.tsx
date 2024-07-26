import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskItem } from '@increaser/ui/tasks/TaskItem'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { TaskDragHandle } from './TaskDragHandle'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useBacklog } from './hooks/useBacklog'
import { DnDList } from '@lib/dnd/DnDList'
import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'

export const TasksBacklog = () => {
  const tasks = useBacklog()
  const [activeTaskId] = useActiveItemId()

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  return (
    <DnDList
      items={tasks}
      getItemId={(task) => task.id}
      getItemOrder={(task) => task.order}
      onChange={(id, { order }) => {
        updateTask({
          id,
          fields: {
            order,
          },
        })
      }}
      renderList={({ content, containerProps }) => (
        <VStack {...containerProps}>{content}</VStack>
      )}
      renderItem={({
        item,
        draggableProps,
        dragHandleProps,
        isDragging,
        isDraggingEnabled,
      }) => {
        const isEnabled = isDraggingEnabled && !activeTaskId

        return (
          <DraggableItemContainer
            isActive={isDragging ?? false}
            {...draggableProps}
          >
            <TaskDragHandle
              isEnabled={isEnabled}
              isActive={isDragging ?? false}
              {...dragHandleProps}
            />
            <CurrentTaskProvider value={item} key={item.id}>
              <TaskItem />
            </CurrentTaskProvider>
          </DraggableItemContainer>
        )
      }}
    />
  )
}
