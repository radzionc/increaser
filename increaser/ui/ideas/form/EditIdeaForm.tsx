import { useCallback, useMemo, useState } from 'react'
import { useCurrentIdea } from '../CurrentIdeaProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { IdeaFormShape } from './IdeaFormShape'
import { useIsIdeaFormDisabled } from './useIsIdeaFormDisabled'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { TurnIdeaIntoTask } from './TurnIdeaIntoTask'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'
import { HStack } from '@lib/ui/css/stack'
import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'

export const EditIdeaForm = () => {
  const idea = useCurrentIdea()
  const { id } = idea
  const initialValue = useMemo(
    () => pick(idea, ['name', 'projectId', 'description']),
    [idea],
  )
  const [value, setValue] = useState<IdeaFormShape>(initialValue)

  const { mutate: updateIdea } = useUpdateUserEntityMutation('idea')
  const { mutate: deleteIdea } = useDeleteUserEntityMutation('idea')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsIdeaFormDisabled(value)

  useLazySync<Partial<IdeaFormShape>>({
    value: useMemo(() => {
      const result = getUpdatedValues({
        before: initialValue,
        after: value,
      })

      if (result) {
        return {
          ...result,
          updatedAt: Date.now(),
        }
      }

      return result
    }, [initialValue, value]),
    sync: useCallback(
      (fields) =>
        updateIdea({
          id,
          fields,
        }),
      [id, updateIdea],
    ),
  })

  return (
    <ListItemForm onClose={onFinish} isDisabled={isDisabled}>
      <EmojiTextInputFrame>
        <div>
          <TaskProjectSelector
            value={value.projectId}
            onChange={(projectId) =>
              setValue((prev) => ({ ...prev, projectId }))
            }
          />
        </div>

        <EmbeddedTitleInput
          placeholder="Your idea"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
        />
        <PanelFormCloseButton onClick={onFinish} />
      </EmojiTextInputFrame>

      <EmbeddedDescriptionInput
        label="Description"
        placeholder="Describe your idea"
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
        value={value.description}
      />
      <HStack fullWidth alignItems="center" wrap="wrap" gap={8}>
        <TurnIdeaIntoTask value={value} />
        <PanelFormDeleteButton
          onClick={() => {
            deleteIdea(id)
            onFinish()
          }}
        />
      </HStack>
    </ListItemForm>
  )
}
