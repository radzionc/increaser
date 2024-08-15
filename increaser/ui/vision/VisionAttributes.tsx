import { VStack } from '@lib/ui/layout/Stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { VisionAttributeItem } from './VisionAttributeItem'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { useEffect, useState } from 'react'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { DnDList } from '@lib/dnd/DnDList'
import { Wrap } from '@lib/ui/base/Wrap'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { EditVisionAttributeForm } from './form/EditVisionAttributeForm'
import { VisionAttributeItemContent } from './VisionAttributeItemContent'
import { CurrentVisionAttributeProvider } from './CurrentVisionAttributeProvider'
import { useVisionAttributes } from './hooks/useVisionAttributes'

export const VisionAttributes = () => {
  const visionAttributes = useVisionAttributes()

  const [items, setItems] = useState(visionAttributes)
  useEffect(() => {
    setItems(visionAttributes)
  }, [visionAttributes])

  const [activeItemId] = useActiveItemId()

  const { mutate: updateVisionAttribute } =
    useUpdateUserEntityMutation('visionAttribute')

  return (
    <DnDList
      items={sortEntitiesWithOrder(items)}
      getItemId={(item) => item.id}
      getItemOrder={(item) => item.order}
      onChange={(id, { order }) => {
        updateVisionAttribute({
          id,
          fields: {
            order,
          },
        })
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, order } : item)),
        )
      }}
      renderList={({ content, containerProps }) => (
        <VStack {...containerProps}>{content}</VStack>
      )}
      renderDragOverlay={({ item }) => (
        <TightListItemDragOverlay>
          <CurrentVisionAttributeProvider value={item}>
            <VisionAttributeItemContent />
          </CurrentVisionAttributeProvider>
        </TightListItemDragOverlay>
      )}
      renderItem={({ item, draggableProps, dragHandleProps, isDragging }) => {
        return (
          <Wrap
            wrap={
              activeItemId === null
                ? (children) => (
                    <DraggableTightListItemContainer
                      isDragging={isDragging}
                      key={item.id}
                      {...draggableProps}
                      {...dragHandleProps}
                    >
                      {children}
                    </DraggableTightListItemContainer>
                  )
                : undefined
            }
            key={item.id}
          >
            <CurrentVisionAttributeProvider value={item}>
              {activeItemId === item.id ? (
                <EditVisionAttributeForm />
              ) : (
                <VisionAttributeItem />
              )}
            </CurrentVisionAttributeProvider>
          </Wrap>
        )
      }}
    />
  )
}
