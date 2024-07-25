import { useCallback, useRef, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { IdeaFormShape } from './IdeaFormShape'
import { useIsIdeaFormDisabled } from './useIsIdeaFormDisabled'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { otherProjectId } from '@increaser/entities/Project'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'

export const CreateIdeaForm = ({ onFinish }: FinishableComponentProps) => {
  const [value, setValue] = useState<IdeaFormShape>({
    name: '',
    description: '',
    projectId: otherProjectId,
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
    >
      <EmojiTextInputFrame>
        <div>
          <TaskProjectSelector
            autoFocus
            value={value.projectId}
            onChange={(projectId) => {
              setValue((prev) => ({ ...prev, projectId }))
              nameInputRef.current?.focus()
            }}
          />
        </div>
        <EmbeddedTitleInput
          placeholder="Your idea"
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
    </Panel>
  )
}
