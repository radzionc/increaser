import { DnDList } from '@lib/dnd/DnDList'
import { Wrap } from '@lib/ui/base/Wrap'
import { VStack } from '@lib/ui/css/stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { CurrentHabitProvider } from '@product/ui/habits/CurrentHabitProvider'
import { useActiveHabits } from '@product/ui/habits/hooks/useActiveHabits'
import { useUpdateUserEntityMutation } from '@product/ui/userEntity/api/useUpdateUserEntityMutation'
import { useEffect, useState } from 'react'

import { HabitItem } from './HabitItem'

export const ActiveHabits = () => {
  const habits = useActiveHabits()

  const [items, setItems] = useState(() => sortEntitiesWithOrder(habits))
  useEffect(() => {
    setItems(sortEntitiesWithOrder(habits))
  }, [habits])

  const [, setActiveItemId] = useActiveItemId()

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')

  return (
    <DnDList
      items={items}
      getItemId={(item) => item.id}
      onChange={(id, { index }) => {
        const order = getNewOrder({
          orders: items.map((item) => item.order),
          sourceIndex: items.findIndex((item) => item.id === id),
          destinationIndex: index,
        })

        updateHabit({
          id,
          fields: {
            order,
          },
        })

        setItems((prev) =>
          sortEntitiesWithOrder(
            prev.map((item) => (item.id === id ? { ...item, order } : item)),
          ),
        )
      }}
      renderList={({ props }) => <VStack {...props} />}
      renderItem={({ item, draggableProps, dragHandleProps, status }) => {
        return (
          <CurrentHabitProvider key={item.id} value={item}>
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
            >
              <HabitItem onClick={() => setActiveItemId(item.id)} />
            </Wrap>
          </CurrentHabitProvider>
        )
      }}
    />
  )
}
