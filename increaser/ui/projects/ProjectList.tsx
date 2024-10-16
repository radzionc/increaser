import { VStack } from '@lib/ui/css/stack'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'

import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { DnDList } from '@lib/dnd/DnDList'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { ProjectItem } from './ProjectItem'
import { useFilteredByStatusProjects } from './hooks/useFilteredByStatusProjects'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { useState, useEffect } from 'react'

export const ProjectList = () => {
  const projects = useFilteredByStatusProjects()

  const [items, setItems] = useState(() => sortEntitiesWithOrder(projects))
  useEffect(() => {
    setItems(sortEntitiesWithOrder(projects))
  }, [projects])

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

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

        updateProject({
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
          <CurrentProjectProvider key={item.id} value={item}>
            {status === 'overlay' ? (
              <TightListItemDragOverlay>
                <ProjectItem />
              </TightListItemDragOverlay>
            ) : (
              <DraggableTightListItemContainer
                isDragging={status === 'placeholder'}
                {...draggableProps}
                {...dragHandleProps}
              >
                <ProjectItem />
              </DraggableTightListItemContainer>
            )}
          </CurrentProjectProvider>
        )
      }}
    />
  )
}
