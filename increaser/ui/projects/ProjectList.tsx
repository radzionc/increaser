import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'

import { ProjectItem } from './ProjectItem'
import { ListItemDragHandle } from '@lib/ui/dnd/ListItemDragHandle'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { projectsConfig } from './config'
import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'
import { useProjectStatusFilter } from './filter/status/ProjectStatusFilterProvider'
import { order } from '@lib/utils/array/order'
import { DnDListDeprecated } from '@lib/dnd/DnDListDeprecated'

const DragHandle = styled(ListItemDragHandle)`
  height: ${toSizeUnit(
    projectsConfig.contentMinHeight + projectsConfig.verticalPadding * 2,
  )};
`

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

  return (
    <DnDListDeprecated
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
            <CurrentProjectProvider value={item} key={item.id}>
              <ProjectItem />
            </CurrentProjectProvider>
          </DraggableItemContainer>
        )
      }}
    />
  )
}
