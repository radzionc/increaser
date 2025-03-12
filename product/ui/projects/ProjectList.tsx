import { DnDList } from '@lib/dnd/DnDList'
import { Wrap } from '@lib/ui/base/Wrap'
import { VStack } from '@lib/ui/css/stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { CurrentProjectProvider } from '@product/ui/projects/CurrentProjectProvider'
import { useState, useEffect } from 'react'

import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'

import { EditProjectForm } from './form/EditProjectForm'
import { useFilteredByStatusProjects } from './hooks/useFilteredByStatusProjects'
import { ProjectItem } from './ProjectItem'

export const ProjectList = () => {
  const projects = useFilteredByStatusProjects()

  const [items, setItems] = useState(() => sortEntitiesWithOrder(projects))
  useEffect(() => {
    setItems(sortEntitiesWithOrder(projects))
  }, [projects])

  const [activeItemId, setActiveItemId] = useActiveItemId()

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
        const isEditing = activeItemId === item.id
        return (
          <CurrentProjectProvider key={item.id} value={item}>
            {isEditing ? (
              <PanelModal onFinish={() => setActiveItemId(null)}>
                <EditProjectForm onFinish={() => setActiveItemId(null)} />
              </PanelModal>
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
                <ProjectItem onClick={() => setActiveItemId(item.id)} />
              </Wrap>
            )}
          </CurrentProjectProvider>
        )
      }}
    />
  )
}
