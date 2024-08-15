import { VStack } from '@lib/ui/layout/Stack'
import { order } from '@lib/utils/array/order'
import { ListItemDragHandle } from '@lib/ui/dnd/ListItemDragHandle'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { habitContentMinHeight, habitVerticalPadding } from './config'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { CurrentHabitProvider } from '@increaser/ui/habits/CurrentHabitProvider'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { HabitItem } from './HabitItem'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { DnDListDeprecated } from '@lib/dnd/DnDListDeprecated'

const DragHandle = styled(ListItemDragHandle)`
  height: ${toSizeUnit(habitContentMinHeight + habitVerticalPadding * 2)};
`

export const Habits = () => {
  const { habits } = useHabits()
  const items = order(Object.values(habits), (item) => item.order, 'asc')

  const [activeItemId] = useActiveItemId()

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')

  return (
    <DnDListDeprecated
      items={items}
      getItemId={(item) => item.id}
      getItemOrder={(item) => item.order}
      onChange={(id, { order }) => {
        updateHabit({
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
        const isEnabled = isDraggingEnabled && !activeItemId

        return (
          <DraggableItemContainer
            isActive={isDragging ?? false}
            {...draggableProps}
          >
            <DragHandle
              isEnabled={isEnabled}
              isActive={isDragging ?? false}
              {...dragHandleProps}
            />
            <CurrentHabitProvider key={item.id} value={item}>
              <HabitItem />
            </CurrentHabitProvider>
          </DraggableItemContainer>
        )
      }}
    />
  )
}
