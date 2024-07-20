import { useCallback, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { useCurrentNote } from '../CurrentNoteProvider'
import { Note } from '@increaser/entities/Note'
import { useUpdateNoteMutation } from '../api/useUpdateNoteMutation'
import { useDeleteNoteMutation } from '../api/useDeleteNoteMutation'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { NoteFormShape } from './NoteFormShape'
import { useIsNoteFormDisabled } from './useIsNoteFormDisabled'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { pick } from '@lib/utils/record/pick'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { omit } from '@lib/utils/record/omit'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { NoteDescriptionInput } from './NoteDescriptionInput'
import { TaskNameInput } from '../../tasks/TaskNameInput'

export const EditNoteForm = () => {
  const note = useCurrentNote()
  const [value, setValue] = useState<NoteFormShape>(
    pick(note, ['name', 'projectId', 'description']),
  )

  const { mutate: updateNote } = useUpdateNoteMutation()
  const { mutate: deleteNote } = useDeleteNoteMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsNoteFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Note, 'id'>> = getUpdatedValues(
      omit(note, 'id'),
      {
        ...value,
        updatedAt: Date.now(),
      },
    )

    updateNote({
      id: note.id,
      fields,
    })
    onFinish()
  }, [isDisabled, note, onFinish, updateNote, value])

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

        <TaskNameInput
          placeholder="Your idea"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>

      <NoteDescriptionInput
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
        value={value.description}
      />
      <EditDeleteFormFooter
        onDelete={() => {
          deleteNote({ id: note.id })
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </Panel>
  )
}
