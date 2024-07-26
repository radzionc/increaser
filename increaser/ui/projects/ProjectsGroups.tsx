import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { groupItems } from '@lib/utils/array/groupItems'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { DnDGroups, ItemChangeParams } from '@lib/dnd/DnDGroups'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'
import {
  Project,
  ProjectStatus,
  projectStatuses,
} from '@increaser/entities/Project'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { useCallback, useMemo } from 'react'
import { ProjectItem } from './ProjectItem'
import { ListItemDragHandle } from '@lib/ui/dnd/ListItemDragHandle'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { projectsConfig } from './config'
import { couldProjectStatusBeChanged } from '@increaser/entities-utils/project/couldProjectStatusBeChanged'
import { CreateProjectPrompt } from './CreateProjectPrompt'
import { ProjectsGroup } from './ProjectsGroup'
import { useUpdateUserEntityMutation } from '../userEntity/api/useUpdateUserEntityMutation'

const DragHandle = styled(ListItemDragHandle)`
  height: ${toSizeUnit(
    projectsConfig.contentMinHeight + projectsConfig.verticalPadding * 2,
  )};
`

export const ProjectsGroups = () => {
  const { projects } = useAssertUserState()
  const [activeItemId] = useActiveItemId()

  const groups = useMemo(() => {
    return {
      ...makeRecord(projectStatuses, () => [] as Project[]),
      ...groupItems(Object.values(projects), ({ status }) => status),
    }
  }, [projects])

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  const onChange = useCallback(
    (id: string, { order, groupId }: ItemChangeParams<ProjectStatus>) => {
      if (!couldProjectStatusBeChanged(id) && groupId !== projects[id].status) {
        return
      }
      const fields: Partial<Omit<Project, 'id'>> = {
        order,
        status: groupId,
      }
      updateProject({
        id,
        fields,
      })
    },
    [projects, updateProject],
  )

  return (
    <DnDGroups
      groups={groups}
      getGroupOrder={(status) => projectStatuses.indexOf(status)}
      getItemId={(project) => project.id}
      getItemOrder={(project) => project.order}
      onChange={onChange}
      renderGroup={({ content, groupId, containerProps }) => (
        <VStack {...containerProps} key={groupId}>
          <ProjectsGroup count={groups[groupId].length} value={groupId}>
            {content}
            {groupId === 'active' && <CreateProjectPrompt />}
          </ProjectsGroup>
        </VStack>
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
