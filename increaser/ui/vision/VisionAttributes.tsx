import { VStack } from '@lib/ui/css/stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionAttributeItem } from './VisionAttributeItem'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { DnDList } from '@lib/dnd/DnDList'
import { Wrap } from '@lib/ui/base/Wrap'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { EditVisionAttributeForm } from './form/EditVisionAttributeForm'
import { CurrentVisionAttributeProvider } from './CurrentVisionAttributeProvider'
import { useVisionAttributes } from './hooks/useVisionAttributes'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { useState, useEffect } from 'react'

export const VisionAttributes = () => {
  const visionAttributes = useVisionAttributes()

  const [items, setItems] = useState(() =>
    sortEntitiesWithOrder(visionAttributes),
  )
  useEffect(() => {
    setItems(sortEntitiesWithOrder(visionAttributes))
  }, [visionAttributes])

  const [activeItemId] = useActiveItemId()

  const { mutate: updateVisionAttribute } =
    useUpdateUserEntityMutation('visionAttribute')

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

        updateVisionAttribute({
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
        const isEditing = activeItemId === item.id
        return (
          <CurrentVisionAttributeProvider key={item.id} value={item}>
            {isEditing ? (
              <EditVisionAttributeForm />
            ) : (
              <Wrap
                wrap={
                  activeItemId === null
                    ? (children) =>
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
                    : undefined
                }
              >
                <VisionAttributeItem />
              </Wrap>
            )}
          </CurrentVisionAttributeProvider>
        )
      }}
    />
  )
}
