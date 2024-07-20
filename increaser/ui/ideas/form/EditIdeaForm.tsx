import { useCallback, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { useCurrentIdea } from '../CurrentIdeaProvider'
import { Idea } from '@increaser/entities/Idea'
import { useUpdateIdeaMutation } from '../api/useUpdateIdeaMutation'
import { useDeleteIdeaMutation } from '../api/useDeleteIdeaMutation'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { IdeaFormShape } from './IdeaFormShape'
import { useIsIdeaFormDisabled } from './useIsIdeaFormDisabled'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { pick } from '@lib/utils/record/pick'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { omit } from '@lib/utils/record/omit'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { TurnIdeaIntoTask } from './TurnIdeaIntoTask'

export const EditIdeaForm = () => {
  const idea = useCurrentIdea()
  const [value, setValue] = useState<IdeaFormShape>(
    pick(idea, ['name', 'projectId', 'description']),
  )

  const { mutate: updateIdea } = useUpdateIdeaMutation()
  const { mutate: deleteIdea } = useDeleteIdeaMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsIdeaFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Idea, 'id'>> = getUpdatedValues(
      omit(idea, 'id'),
      {
        ...value,
        updatedAt: Date.now(),
      },
    )

    updateIdea({
      id: idea.id,
      fields,
    })
    onFinish()
  }, [isDisabled, idea, onFinish, updateIdea, value])

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
          deleteIdea({ id: idea.id })
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </Panel>
  )
}
