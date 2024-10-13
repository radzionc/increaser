import { useCallback, useMemo, useState } from 'react'
import { HStack } from '@lib/ui/css/stack'
import { ProjectStatus } from '@increaser/entities/Project'
import { ProjectFormShape } from './ProjectFormShape'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { useUser } from '@increaser/ui/user/state/user'
import { ProjectStatusInput } from './ProjectStatusInput'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { DeleteProject } from './DeleteProject'
import { couldProjectStatusBeChanged } from '@increaser/entities-utils/project/couldProjectStatusBeChanged'
import { couldProjectBeDeleted } from '@increaser/entities-utils/project/couldProjectBeDeleted'
import { EmojiColorTextInputFrame } from '../../form/EmojiColorTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { EmojiInput } from '../../form/emoji-input/EmojiInput'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { Panel } from '@lib/ui/css/panel'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'

type EditProjectFormShape = ProjectFormShape & {
  status: ProjectStatus
}

export const EditProjectForm = () => {
  const project = useCurrentProject()
  const { projects } = useUser()
  const { id } = project
  const usedColors = Object.values(projects).map(({ color }) => color)

  const initialValue = useMemo(
    () => pick(project, ['name', 'emoji', 'color', 'status']),
    [project],
  )

  const [value, setValue] = useState<EditProjectFormShape>(initialValue)

  const { mutate: updateProject } = useUpdateUserEntityMutation('project')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  useLazySync<Partial<EditProjectFormShape>>({
    value: useMemo(() => {
      const result = getUpdatedValues({
        before: initialValue,
        after: value,
      })

      if (result && 'status' in result) {
        return {
          ...result,
          order: getLastItemOrder(
            Object.values(projects)
              .filter(({ status }) => status === value.status)
              .map((project) => project.order),
          ),
        }
      }

      return result
    }, [initialValue, projects, value]),
    sync: useCallback(
      (fields) =>
        updateProject({
          id,
          fields,
        }),
      [id, updateProject],
    ),
  })

  const isStatusEditable = couldProjectStatusBeChanged(project.id)
  const isDeletable = couldProjectBeDeleted(project.id)

  return (
    <Panel style={{ width: '100%' }} withSections kind="secondary">
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
        />
        <PanelFormCloseButton onClick={onFinish} />
      </EmojiColorTextInputFrame>
      {(isStatusEditable || isDeletable) && (
        <HStack alignItems="center" gap={8} wrap="wrap">
          {isStatusEditable && (
            <ProjectStatusInput
              value={value.status}
              onChange={(status) => setValue((prev) => ({ ...prev, status }))}
            />
          )}
          {isDeletable && <DeleteProject />}
        </HStack>
      )}
    </Panel>
  )
}
