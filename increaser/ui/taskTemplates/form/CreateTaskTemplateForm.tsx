import { useCallback, useRef, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { otherProject } from '@increaser/entities/Project'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { TaskLinksInput } from '../../tasks/form/TaskLinksInput'
import { TaskChecklistInput } from '../../tasks/form/checklist/TaskChecklistInput'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { TaskDescriptionInput } from '../../tasks/form/TaskDescriptionInput'
import { FinishableComponentProps } from '@lib/ui/props'
import { useIsTaskTemplateFormDisabled } from './useIsTaskTemplateFormDisabled'
import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'

export const CreateTaskTemplateForm = ({
  onFinish,
}: FinishableComponentProps) => {
  const [value, setValue] = useState<TaskTemplateFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    checklist: [],
    description: '',
  })
  const { mutate, isPending } = useCreateUserEntityMutation('taskTemplate')

  const isDisabled = useIsTaskTemplateFormDisabled(value)

  const onSubmit = useCallback(() => {
    const taskTemplate: TaskTemplate = {
      id: getId(),
      ...value,
    }
    mutate(taskTemplate)
    onFinish()
  }, [mutate, onFinish, value])

  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
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
          placeholder="Task template name"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
          ref={nameInputRef}
        />
      </EmojiTextInputFrame>
      <TaskDescriptionInput
        value={value.description}
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <CreateFormFooter
        isPending={isPending}
        isDisabled={isDisabled}
        onCancel={() => {
          onFinish()
        }}
      />
    </ListItemForm>
  )
}
