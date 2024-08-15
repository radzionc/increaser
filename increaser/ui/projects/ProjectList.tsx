import { VStack } from '@lib/ui/layout/Stack'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import styled from 'styled-components'

import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { DnDList } from '@lib/dnd/DnDList'
import { ProjectItemContent } from './ProjectItemContent'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { EditProjectForm } from './form/EditProjectForm'
import { ProjectItem } from './ProjectItem'
import { Wrap } from '@lib/ui/base/Wrap'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { useEffect, useState } from 'react'
import { useFilteredByStatusProjects } from './hooks/useFilteredByStatusProjects'

const ItemContainer = styled.div<{ isDragging: boolean }>``

export const ProjectList = () => {
  const projects = useFilteredByStatusProjects()

  const [activeItemId] = useActiveItemId()

  const [items, setItems] = useState(projects)
  useEffect(() => {
    setItems(projects)
  }, [projects])

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  return (
    <DnDList
      items={sortEntitiesWithOrder(items)}
      getItemId={(item) => item.id}
      getItemOrder={(item) => item.order}
      onChange={(id, { order }) => {
        updateProject({
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
          <CurrentProjectProvider value={item}>
            <ProjectItemContent />
          </CurrentProjectProvider>
        </TightListItemDragOverlay>
      )}
      renderItem={({ item, draggableProps, dragHandleProps, isDragging }) => {
        return (
          <Wrap
            render={(children) =>
              activeItemId === null ? (
                <ItemContainer
                  isDragging={isDragging}
                  key={item.id}
                  {...draggableProps}
                  {...dragHandleProps}
                >
                  {children}
                </ItemContainer>
              ) : (
                children
              )
            }
            key={item.id}
          >
            <CurrentProjectProvider value={item}>
              {activeItemId === item.id ? <EditProjectForm /> : <ProjectItem />}
            </CurrentProjectProvider>
          </Wrap>
        )
      }}
    />
  )
}
