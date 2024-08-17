import { VStack } from '@lib/ui/layout/Stack'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'

import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { DnDList } from '@lib/dnd/DnDList'
import { ProjectItemContent } from './ProjectItemContent'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { EditProjectForm } from './form/EditProjectForm'
import { ProjectItem } from './ProjectItem'
import { Wrap } from '@lib/ui/base/Wrap'
import { useFilteredByStatusProjects } from './hooks/useFilteredByStatusProjects'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'

export const ProjectList = () => {
  const projects = useFilteredByStatusProjects()

  const [activeItemId] = useActiveItemId()

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  return (
    <DnDList
      items={projects}
      getItemId={(item) => item.id}
      getItemOrder={(item) => item.order}
      onChange={({ id, order }) => {
        updateProject({
          id,
          fields: {
            order,
          },
        })
      }}
      simulateChange={(items, { id, order }) =>
        items.map((item) => (item.id === id ? { ...item, order } : item))
      }
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
            <CurrentProjectProvider value={item}>
              {activeItemId === item.id ? <EditProjectForm /> : <ProjectItem />}
            </CurrentProjectProvider>
          </Wrap>
        )
      }}
    />
  )
}
