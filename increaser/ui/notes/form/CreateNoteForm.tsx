import { useCallback, useRef, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { useCreateNoteMutation } from '../api/useCreateNoteMutation'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { NoteFormShape } from './NoteFormShape'
import { useIsNoteFormDisabled } from './useIsNoteFormDisabled'
import { NoteDescriptionInput } from './NoteDescriptionInput'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { otherProjectId } from '@increaser/entities/Project'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { TaskNameInput } from '../../tasks/TaskNameInput'

export const CreateNoteForm = ({ onFinish }: FinishableComponentProps) => {
  const [value, setValue] = useState<NoteFormShape>({
    name: '',
    description: '',
    projectId: otherProjectId,
  })
  const { mutate } = useCreateNoteMutation()

  const isDisabled = useIsNoteFormDisabled(value)

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
        <TaskNameInput
          placeholder="Your idea"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
          ref={nameInputRef}
        />
      </EmojiTextInputFrame>

      <NoteDescriptionInput
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
        value={value.description}
      />
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </Panel>
  )
}
