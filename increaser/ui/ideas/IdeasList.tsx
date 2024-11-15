import { VStack } from '@lib/ui/css/stack'
import { useIdeas } from './hooks/useIdeas'
import { useFilterByProject } from '../projects/filter/project/state/projectFilter'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'
import { DnDList } from '@lib/dnd/DnDList'
import { Wrap } from '@lib/ui/base/Wrap'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { useState, useEffect } from 'react'
import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { CurrentIdeaProvider } from './CurrentIdeaProvider'
import { IdeaItem } from './IdeaItem'

export const IdeasList = () => {
  const ideas = useFilterByProject(useIdeas(), getProjectId)

  const [items, setItems] = useState(() => sortEntitiesWithOrder(ideas))
  useEffect(() => {
    setItems(sortEntitiesWithOrder(ideas))
  }, [ideas])

  const { mutate: updateIdea } = useUpdateUserEntityMutation('idea')

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

        updateIdea({
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
          <CurrentIdeaProvider key={item.id} value={item}>
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
              <IdeaItem />
            </Wrap>
          </CurrentIdeaProvider>
        )
      }}
    />
  )
}
