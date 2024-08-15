import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import styled from 'styled-components'

import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { useProjectStatusFilter } from './filter/status/ProjectStatusFilterProvider'
import { order } from '@lib/utils/array/order'
import { DnDList } from '@lib/dnd/DnDList'
import { ProjectItemContent } from './ProjectItemContent'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { EditProjectForm } from './form/EditProjectForm'
import { ProjectItem } from './ProjectItem'
import { Wrap } from '@lib/ui/base/Wrap'

const ItemContainer = styled.div<{ isDragging: boolean }>``

export const ProjectList = () => {
  const { projects } = useAssertUserState()
  const [status] = useProjectStatusFilter()

  const [activeItemId] = useActiveItemId()

  const items = order(
    Object.values(projects).filter((project) => project.status === status),
    (item) => item.order,
    'asc',
  )

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  if (activeItemId) {
  }

  return (
    <DnDList
      items={items}
      getItemId={(item) => item.id}
      getItemOrder={(item) => item.order}
      onChange={(id, { order }) => {
        updateProject({
          id,
          fields: {
            order,
          },
        })
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
                  isDragging={!!isDragging}
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
