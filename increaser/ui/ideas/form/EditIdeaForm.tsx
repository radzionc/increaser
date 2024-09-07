import { useCallback, useState } from 'react'
import { useCurrentIdea } from '../CurrentIdeaProvider'
import { Idea } from '@increaser/entities/Idea'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { IdeaFormShape } from './IdeaFormShape'
import { useIsIdeaFormDisabled } from './useIsIdeaFormDisabled'
import { pick } from '@lib/utils/record/pick'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { TurnIdeaIntoTask } from './TurnIdeaIntoTask'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'

export const EditIdeaForm = () => {
  const idea = useCurrentIdea()
  const initialValue = pick(idea, ['name', 'projectId', 'description'])
  const [value, setValue] = useState<IdeaFormShape>(initialValue)

  const { mutate: updateIdea } = useUpdateUserEntityMutation('idea')
  const { mutate: deleteIdea } = useDeleteUserEntityMutation('idea')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsIdeaFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Idea, 'id'>> = getUpdatedValues({
      before: initialValue,
      after: value,
    })

    if (!isRecordEmpty(fields)) {
      updateIdea({
        id: idea.id,
        fields: {
          ...fields,
          updatedAt: Date.now(),
        },
      })
    }
    onFinish()
  }, [idea.id, initialValue, isDisabled, onFinish, updateIdea, value])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
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
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>

      <EmbeddedDescriptionInput
        label="Description"
        placeholder="Describe your idea"
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
        value={value.description}
      />
      <TurnIdeaIntoTask value={value} />
      <EditDeleteFormFooter
        onDelete={() => {
          deleteIdea(idea.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
