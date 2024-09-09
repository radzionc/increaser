import { useCallback, useRef, useState } from 'react'
import { NoValueFinishProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { IdeaFormShape } from './IdeaFormShape'
import { useIsIdeaFormDisabled } from './useIsIdeaFormDisabled'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { otherProjectId } from '@increaser/entities/Project'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'

type CreateIdeaFormProps = NoValueFinishProps & {
  initialValue?: Partial<IdeaFormShape>
}

export const CreateIdeaForm = ({
  onFinish,
  initialValue,
}: CreateIdeaFormProps) => {
  const [value, setValue] = useState<IdeaFormShape>({
    name: '',
    description: '',
    projectId: otherProjectId,
    ...initialValue,
  })
  const { mutate } = useCreateUserEntityMutation('idea')

  const isDisabled = useIsIdeaFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      id: getId(),
      ...value,
      updatedAt: Date.now(),
    })
    onFinish()
  }, [isDisabled, mutate, onFinish, value])

  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

  const shouldFocusProjectInput = !initialValue?.projectId

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <EmojiTextInputFrame>
        <div>
          <TaskProjectSelector
            autoFocus={shouldFocusProjectInput}
            value={value.projectId}
            onChange={(projectId) => {
              setValue((prev) => ({ ...prev, projectId }))
              nameInputRef.current?.focus()
            }}
          />
        </div>
        <EmbeddedTitleInput
          placeholder="Your idea"
          autoFocus={!shouldFocusProjectInput}
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
          ref={nameInputRef}
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
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </ListItemForm>
  )
}
