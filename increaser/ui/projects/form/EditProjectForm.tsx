import { useCallback, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { Project, ProjectStatus } from '@increaser/entities/Project'
import { ProjectNameInput } from './ProjectNameInput'
import { ProjectFormShape } from './ProjectFormShape'
import { useIsProjectFormDisabled } from './useIsProjectFormDisabled'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { ProjectFormHeader } from './ProjectFormHeader'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { useAssertUserState } from '../../user/UserStateContext'
import { useUpdateProjectMutation } from '../api/useUpdateProjectMutation'
import { ProjectStatusInput } from './ProjectStatusInput'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { DeleteProject } from './DeleteProject'
import { couldProjectStatusBeChanged } from '@increaser/entities-utils/project/couldProjectStatusBeChanged'
import { couldProjectBeDeleted } from '@increaser/entities-utils/project/couldProjectBeDeleted'

type EditProjectFormShape = ProjectFormShape & {
  status: ProjectStatus
}

export const EditProjectForm = () => {
  const project = useCurrentProject()
  const { projects } = useAssertUserState()
  const usedColors = Object.values(projects).map(({ color }) => color)

  const [value, setValue] = useState<EditProjectFormShape>({
    name: project.name,
    emoji: project.emoji,
    color: project.color,
    status: project.status,
  })

  const { mutate: updateProject } = useUpdateProjectMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsProjectFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Project, 'id'>> = {}
    if (value.name !== project.name) {
      fields.name = value.name
    }
    if (value.color !== project.color) {
      fields.color = value.color
    }
    if (value.emoji !== project.emoji) {
      fields.emoji = value.emoji
    }
    if (value.status !== project.status) {
      fields.status = value.status
      fields.order = getLastItemOrder(
        Object.values(projects)
          .filter(({ status }) => status === value.status)
          .map((project) => project.order),
      )
    }

    updateProject({
      id: project.id,
      fields,
    })
    onFinish()
  }, [project, isDisabled, onFinish, updateProject, value])

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
      style={{ width: '100%' }}
    >
      <ProjectFormHeader>
        <div>
          <EmojiInput
            value={value.emoji}
            onChange={(emoji) => setValue((prev) => ({ ...prev, emoji }))}
          />
        </div>
        <div>
          <ColorLabelInput
            usedValues={new Set(usedColors)}
            value={value.color}
            onChange={(color) => setValue((prev) => ({ ...prev, color }))}
          />
        </div>
        <ProjectNameInput
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </ProjectFormHeader>
      {couldProjectStatusBeChanged(project.id) && (
        <VStack alignItems="start">
          <ProjectStatusInput
            value={value.status}
            onChange={(status) => setValue((prev) => ({ ...prev, status }))}
          />
        </VStack>
      )}
      <HStack
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={20}
      >
        {couldProjectBeDeleted(project.id) ? <DeleteProject /> : <div />}
        <HStack alignItems="center" gap={8}>
          <Button isDisabled={isDisabled} onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button>Save</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
