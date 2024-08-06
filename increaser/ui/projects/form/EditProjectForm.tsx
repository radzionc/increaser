import { useCallback, useState } from 'react'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { Project, ProjectStatus } from '@increaser/entities/Project'
import { ProjectFormShape } from './ProjectFormShape'
import { useIsProjectFormDisabled } from './useIsProjectFormDisabled'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { useAssertUserState } from '../../user/UserStateContext'
import { ProjectStatusInput } from './ProjectStatusInput'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { DeleteProject } from './DeleteProject'
import { couldProjectStatusBeChanged } from '@increaser/entities-utils/project/couldProjectStatusBeChanged'
import { couldProjectBeDeleted } from '@increaser/entities-utils/project/couldProjectBeDeleted'
import { EmojiColorTextInputFrame } from '../../form/EmojiColorTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { EmojiInput } from '../../form/emoji-input/EmojiInput'

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

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

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
  }, [
    isDisabled,
    value.name,
    value.color,
    value.emoji,
    value.status,
    project.name,
    project.color,
    project.emoji,
    project.status,
    project.id,
    updateProject,
    onFinish,
    projects,
  ])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <EmojiColorTextInputFrame>
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
        <EmbeddedTitleInput
          placeholder="Project name"
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </EmojiColorTextInputFrame>
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
    </ListItemForm>
  )
}
